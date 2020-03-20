package br.com.rd.ecommerce.services.order;

import br.com.rd.ecommerce.converters.Converter;
import br.com.rd.ecommerce.models.dto.AddressDTO;
import br.com.rd.ecommerce.models.dto.ClientDTO;
import br.com.rd.ecommerce.models.dto.OrderDTO;
import br.com.rd.ecommerce.models.dto.OrderItemDTO;
import br.com.rd.ecommerce.models.entities.*;
import br.com.rd.ecommerce.repositories.ClientRepository;
import br.com.rd.ecommerce.repositories.OrderRespository;
import br.com.rd.ecommerce.repositories.ProductRepository;
import br.com.rd.ecommerce.services.exceptions.ClientException;
import br.com.rd.ecommerce.services.exceptions.OrderException;
import br.com.rd.ecommerce.services.mailsender.MailSenderServiceImpl;
import br.com.rd.ecommerce.services.product.ProductServiceImpl;
import br.com.rd.ecommerce.services.stock.StockServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailSendException;
import org.springframework.stereotype.Service;

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
    private StockServiceImpl stockService;
    @Autowired
    private ClientRepository clientRepository;
    @Autowired
    private MailSenderServiceImpl mailSender;
    private Converter converter = new Converter();

    @Override
    public ResponseEntity findAllOrders() {
        try {
            List<Order> orders = respository.findAll();

            if (orders == null || orders.size() <= 0)
                return ResponseEntity.badRequest().body(new OrderException("Nenhum pedido encontrado"));
            List<OrderDTO> ordersDTO = new ArrayList<>();
            for (Order order : orders)
                ordersDTO.add(converter.convertTo(order));


            return ResponseEntity.ok().body(ordersDTO);
        } catch(Exception e){
            return ResponseEntity.badRequest().body(new OrderException("Erro" + e.getMessage()));
        }
    }

    @Override
    public ResponseEntity findByDate(String date) {
        Date now = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
        try {
            Date dt = sdf.parse(date);
            if (!dt.before(now) || date == null)
                return ResponseEntity.badRequest().body(new OrderException("Data invalida"));
            List<Order> orders = respository.findByDate(dt);
            if (orders == null || orders.size() <= 0)
                return ResponseEntity.badRequest().body(new OrderException("Nenhum pedido encontrado"));

            List<OrderDTO> ordersDTO = new ArrayList<>();
            for(Order order: orders)
                ordersDTO.add(converter.convertTo(order));

            return ResponseEntity.ok().body(ordersDTO);
        } catch (ParseException e) {
            return ResponseEntity.badRequest().body(new OrderException("Formato de data invalido (dd/mm/yyyy)"));
        }
    }

    @Override
    public ResponseEntity findById(Long id) {
        try {
            Order item = respository.findById(id).get();
            if (item == null || id == null)
                return ResponseEntity.badRequest().body(new OrderException("Erro ao encontrar o pedido"));
            OrderDTO oDTO = converter.convertTo(item);
            return ResponseEntity.ok().body(oDTO);
        } catch (Exception e){
            return ResponseEntity.badRequest().body(new OrderException("Erro" + e.getMessage()));
        }
    }


//    public ResponseEntity<List<Order>> findByClient(Client client) {
//        if(client == null)
//            return ResponseEntity.badRequest().build();
//        List<Order> orders = respository.findByClient(client);
//        if(orders == null || orders.size() <= 0)
//            return ResponseEntity.badRequest().build();
//        return ResponseEntity.ok().body(orders);
//    }

    @Override
    public ResponseEntity createOrder(OrderDTO order) {

        if(order == null || order.getClient() == null)
            return ResponseEntity.badRequest().body(new OrderException("Cliente não informado"));

        if(order.getOrderItem() == null || order.getOrderItem().size() <= 0)
            return ResponseEntity.badRequest().body(new OrderException("O pedido não contem items"));
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
            for(OrderItem oi: returnOrder.getOrderItem()) {
                returnOrderDTO.addItem(converter.convertTo(oi));
                stockService.updateItemOnStockByOrder(1L, oi);
            }

            StringBuilder sb = new StringBuilder();
            sb.append("Parabéns sua compra foi feita e esta sendo processada\n");
            sb.append("Resumo da sua compra\n\n\nProdutos:\n");
            for(OrderItem oi: returnOrder.getOrderItem()){
                sb.append(oi.getProduct().getName());
                sb.append(", valor: R$ ");
                sb.append(String.format("%.2f", oi.getValue()));
                sb.append(", quantidade: ");
                sb.append(oi.getQuantity());
                sb.append("total do item: R$ ");
                sb.append(String.format("%.2f", oi.getQuantity() * oi.getValue()) + "\n");
            }
            sb.append("\n\n\nTotal da compra: ");
            sb.append(String.format("%.2f", orderEntity.getValue()));

            Client c = clientRepository.findById(order.getClient().getId()).get();
            if(c.getEmail() != null)
                mailSender.sendMail(c.getEmail(), "deolindabonecao@gmail.com", sb.toString(), "Informações importantes sobre seu pedido: " + returnOrderDTO.getId());
            return ResponseEntity.ok().body(returnOrderDTO);
        } catch(MailSendException e){
            return ResponseEntity.ok().body(returnOrderDTO);
        }  catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest().body(new OrderException("Erro" + e.getMessage()));
        }
    }

    @Override
    public void deleteOrder(Long id) {
        respository.deleteById(id);
    }
}
