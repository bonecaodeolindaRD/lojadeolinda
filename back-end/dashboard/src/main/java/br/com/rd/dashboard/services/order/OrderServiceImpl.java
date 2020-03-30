package br.com.rd.dashboard.services.order;

import br.com.rd.dashboard.converter.Converter;
import br.com.rd.dashboard.models.dto.OrderDTO;
import br.com.rd.dashboard.models.dto.OrderItemDTO;
import br.com.rd.dashboard.models.entities.*;
import br.com.rd.dashboard.repositories.ClientRepository;
import br.com.rd.dashboard.repositories.OrderRespository;
import br.com.rd.dashboard.repositories.ProductRepository;
import br.com.rd.dashboard.services.exceptions.OrderException;
import br.com.rd.dashboard.services.exceptions.StockException;
import br.com.rd.dashboard.services.stock.StockService;
import org.hibernate.JDBCException;
import org.hibernate.exception.DataException;
import org.hibernate.exception.SQLGrammarException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    private OrderRespository repository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private StockService stockService;
    @Autowired
    private ClientRepository clientRepository;
    @PersistenceContext
    private EntityManager em;
    private Converter converter = new Converter();

    @Override
    public ResponseEntity<?> findAll(Integer page) {

        List<Order> orders = repository.findAll(PageRequest.of(page, 5)).toList();
        if(orders.size() <= 0)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new OrderException("Orders not found"));

        List<OrderDTO> ordersDTO = new ArrayList<>();

        for(Order order: orders)
            ordersDTO.add(converter.convertTo(order));

        return ResponseEntity.status(HttpStatus.OK).body(ordersDTO);
    }

    @Override
    public ResponseEntity<?> findAllOrders() {

        List<Order> orders = repository.findAll();

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
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        try {
            Date dt = sdf.parse(date);
            if (!dt.before(now) || date == null)
                return ResponseEntity.badRequest().body(new OrderException("Date is invalid"));
            List<Order> orders = repository.findByDate(dt).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Order not found"));

            List<OrderDTO> ordersDTO = new ArrayList<>();
            for (Order order : orders) {
                order.setValue(order.total());
                ordersDTO.add(converter.convertTo(order));
            }

            return ResponseEntity.status(HttpStatus.OK).body(ordersDTO);
        } catch (ParseException e) {
            return ResponseEntity.badRequest().body(new OrderException("Date format is invalid"));
        }
    }

    @Override
    public ResponseEntity<?> findByDatePage(String date, Integer page) {
        Date now = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Query query = em.createQuery("select o from Order o where o.date = '" + date + "'").setFirstResult(page * 10)
                .setMaxResults(10);
        try {
            Date dt = sdf.parse(date);
            if (!dt.before(now) || date == null)
                return ResponseEntity.badRequest().body(new OrderException("Date is invalid"));
            List<Order> orders = query.getResultList();
            if(orders == null || orders.size() <= 0)
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new OrderException("Orders not found"));

            List<OrderDTO> ordersDTO = new ArrayList<>();
            for(Order o: orders)
                ordersDTO.add(converter.convertTo(o));

            return ResponseEntity.status(HttpStatus.OK).body(ordersDTO);

        }catch(ParseException e){
            return ResponseEntity.badRequest().body(new OrderException("Date format is invalid"));
        }

    }

    public ResponseEntity<?> findByDateAndStatus(String date, Long status) {
        try {
            Date now = new Date();
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            Date dt = sdf.parse(date);
            if (!dt.before(now) || date == null)
                return ResponseEntity.badRequest().body(new OrderException("Date is invalid"));
            List<Order> orders = repository.findByStatusAndDate(new Status(status, null), dt).orElseThrow(
                    () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Orders not fould")
            );

            List<OrderDTO> ordersDTO = new ArrayList<>();
            for (Order order : orders) {
                order.setValue(order.total());
                ordersDTO.add(converter.convertTo(order));
            }

            return ResponseEntity.status(HttpStatus.OK).body(ordersDTO);
        } catch (ParseException e) {
            return ResponseEntity.badRequest().body(new OrderException("Date format is invalid"));
        }
    }

    @Override
    public ResponseEntity<?> findByStatus(Long id) {

        List<Order> orders = repository.findByStatus(new Status(id, null)).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Orders not found")
        );

        List<OrderDTO> ordersDTO = new ArrayList<>();
        for(Order order: orders)
            ordersDTO.add(converter.convertTo(order));

        return ResponseEntity.status(HttpStatus.OK).body(ordersDTO);

    }

    @Override
    public ResponseEntity<?> findById(Long id) {

        Order item = repository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Order not found"));

        OrderDTO oDTO = converter.convertTo(item);
        for (OrderItem oi : item.getOrderItem())
            oDTO.addItem(converter.convertTo(oi));
        oDTO.setValue(item.getValue());
        oDTO.setClient(converter.convertTo(item.getClient()));
        return ResponseEntity.ok().body(oDTO);
    }

    public ResponseEntity<?> findSales() {
        Query query = em.createQuery("select o.date as date, sum(o.value) as value from Order o where not o.status = 6 group by o.date");

        List<Order> orders = query.getResultList();
        if (orders == null || orders.size() <= 0)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        return ResponseEntity.status(HttpStatus.OK).body(orders);

    }

    @Override
    public ResponseEntity<?> cancelOrder(Long id) {

        Order order = repository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Order not found"));

        if (order.getStatus().getIdStatus() == 6)
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).build();

        for (OrderItem oi : order.getOrderItem())
            stockService.addItemOnStock(1L, oi.getProduct().getId(), oi.getQuantity());

        order.setStatus(new Status(6L, "CANCELADO"));
        OrderDTO orderDTO = converter.convertTo(repository.save(order));

        for (OrderItem oi : order.getOrderItem())
            orderDTO.addItem(converter.convertTo(oi));

        return ResponseEntity.status(HttpStatus.OK).body(orderDTO);
    }

    @Override
    public void deleteOrder(Long id) {
        repository.deleteById(id);
    }

    @ExceptionHandler(DataException.class)
    public ResponseEntity<?> handlerDataException(EntityNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex);
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
