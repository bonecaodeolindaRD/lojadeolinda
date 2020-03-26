package br.com.rd.ecommerce.services.order;

import br.com.rd.ecommerce.converters.Converter;
import br.com.rd.ecommerce.models.dto.OrderDTO;
import br.com.rd.ecommerce.models.dto.OrderItemDTO;
import br.com.rd.ecommerce.models.entities.*;
import br.com.rd.ecommerce.repositories.ClientRepository;
import br.com.rd.ecommerce.repositories.OrderRespository;
import br.com.rd.ecommerce.repositories.ProductRepository;
import br.com.rd.ecommerce.services.exceptions.OrderException;
import br.com.rd.ecommerce.services.exceptions.StockException;
import br.com.rd.ecommerce.services.mailsender.MailSenderServiceImpl;
import br.com.rd.ecommerce.services.stock.StockService;
import org.hibernate.JDBCException;
import org.hibernate.exception.SQLGrammarException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailSendException;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.server.ResponseStatusException;

import javax.persistence.EntityManager;
import javax.persistence.EntityNotFoundException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service("OrderService")
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRespository respository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private StockService stockService;
    @Autowired
    private ClientRepository clientRepository;
    @Autowired
    private MailSenderServiceImpl mailSender;
    @PersistenceContext
    private EntityManager em;
    private Converter converter = new Converter();

    @Override
    public ResponseEntity<?> findAllOrders() {

        List<Order> orders = respository.findAll();

        if (orders.size() <= 0)
            return ResponseEntity.notFound().build();
        List<OrderDTO> ordersDTO = new ArrayList<>();
        for (Order order : orders)
            ordersDTO.add(converter.convertTo(order));

        return ResponseEntity.ok().body(ordersDTO);

    }

    @Override
    public ResponseEntity<?> findByDate(String date) {
        Date now = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
        try {
            Date dt = sdf.parse(date);
            if (!dt.before(now) || date == null)
                return ResponseEntity.badRequest().body(new OrderException("Date is invalid"));
            List<Order> orders = respository.findByDate(dt).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Order not found"));

            List<OrderDTO> ordersDTO = new ArrayList<>();
            for (Order order : orders)
                ordersDTO.add(converter.convertTo(order));

            return ResponseEntity.status(HttpStatus.OK).body(ordersDTO);
        } catch (ParseException e) {
            return ResponseEntity.badRequest().body(new OrderException("Date format is invalid"));
        }
    }

    @Override
    public ResponseEntity<?> findById(Long id) {

        Order item = respository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Order not found"));

        OrderDTO oDTO = converter.convertTo(item);
        for (OrderItem oi : item.getOrderItem())
            oDTO.addItem(converter.convertTo(oi));
        oDTO.setValue(item.getValue());
        return ResponseEntity.ok().body(oDTO);
    }

    @Override
    public ResponseEntity<?> createOrder(OrderDTO order) {

        if (order == null || order.getClient() == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new OrderException("Invalid entity"));

        if (order.getOrderItem() == null || order.getOrderItem().size() <= 0)
            return ResponseEntity.badRequest().body(new OrderException("Order not contains items"));

        OrderDTO returnOrderDTO = new OrderDTO();
        try {
            Order orderEntity = converter.convertTo(order);

            List<OrderItem> orderItems = new ArrayList<>();
            for (OrderItemDTO p : order.getOrderItem()) {
                OrderItem orderItem = converter.convertTo(p);
                Product product = productRepository.findById(p.getProduct().getId()).get();
                orderItem.setProduct(product);
                orderItems.add(orderItem);
            }

            orderEntity.setOrderItem(orderItems);
            orderEntity.setValue(orderEntity.total());
            orderEntity.setClient(converter.convertTo(order.getClient()));
            Order returnOrder = respository.save(orderEntity);
            returnOrderDTO = converter.convertTo(returnOrder);
            returnOrderDTO.setClient(converter.convertTo(returnOrder.getClient()));
            for (OrderItem oi : returnOrder.getOrderItem()) {
                returnOrderDTO.addItem(converter.convertTo(oi));
                stockService.updateItemOnStockByOrder(1L, oi);
            }

            StringBuilder sb = new StringBuilder();
            sb.append("Parabéns sua compra foi feita e esta sendo processada\n");
            sb.append("Resumo da sua compra\n\n\nProdutos:\n");
            for (OrderItem oi : returnOrder.getOrderItem()) {
                sb.append(oi.getProduct().getName());
                sb.append(", valor: R$ ");
                sb.append(String.format("%.2f", oi.getValue()));
                sb.append(", quantidade: ");
                sb.append(oi.getQuantity());
                sb.append(" unidades, total do item: R$ ");
                sb.append(String.format("%.2f", oi.getQuantity() * oi.getValue()) + "\n");
            }
            sb.append("\n\n\nTotal da compra: ");
            sb.append(String.format("%.2f", orderEntity.getValue()));

            Client c = clientRepository.findById(order.getClient().getId()).get();
            if (c.getEmail() != null)
                mailSender.sendMail(c.getEmail(), "deolindabonecao@gmail.com", sb.toString(), "Informações importantes sobre seu pedido: " + returnOrderDTO.getId());
            return ResponseEntity.ok().body(returnOrderDTO);
        } catch (MailSendException e) {
            return ResponseEntity.ok().body(returnOrderDTO);
        } catch (StockException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    public ResponseEntity<?> findSales() {
        Query query = em.createQuery("select o.date as date, sum(o.value) as value from Order o group by o.date");

        List<Order> orders = query.getResultList();
        if (orders == null || orders.size() <= 0)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        return ResponseEntity.status(HttpStatus.OK).body(orders);

    }

    @Override
    public ResponseEntity<?> cancelOrder(Long id) {

        Order order = respository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Order not found"));

        if(order.getStatus().getIdStatus() == 6)
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).build();

        for(OrderItem oi: order.getOrderItem())
            stockService.addItemOnStock(1L, oi.getProduct().getId(), oi.getQuantity());

        order.setStatus(new Status(6L, "CANCELADO"));
        OrderDTO orderDTO = converter.convertTo(respository.save(order));

        for(OrderItem oi: order.getOrderItem())
            orderDTO.addItem(converter.convertTo(oi));

        return ResponseEntity.status(HttpStatus.OK).body(orderDTO);
    }

    @Override
    public void deleteOrder(Long id) {
        respository.deleteById(id);
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<?> handlerEntityExceptionException(EntityNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex);
    }

    @ExceptionHandler(SQLException.class)
    public ResponseEntity<?> handlerSQLException(SQLException ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex);
    }

    @ExceptionHandler(JDBCException.class)
    public ResponseEntity<?> handlerJDBCException(JDBCException ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex);
    }

    @ExceptionHandler(SQLGrammarException.class)
    public ResponseEntity<?> handlerSQLGrammarException(SQLGrammarException ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleException(Exception ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex);
    }
}
