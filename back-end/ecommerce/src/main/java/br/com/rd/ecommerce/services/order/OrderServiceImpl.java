package br.com.rd.ecommerce.services.order;

import br.com.rd.ecommerce.models.dto.AddressDTO;
import br.com.rd.ecommerce.models.dto.ClientDTO;
import br.com.rd.ecommerce.models.dto.OrderDTO;
import br.com.rd.ecommerce.models.dto.OrderItemDTO;
import br.com.rd.ecommerce.models.entities.*;
import br.com.rd.ecommerce.repositories.OrderRespository;
import br.com.rd.ecommerce.services.exceptions.OrderException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
    private Converter converter = new Converter();

    @Override
    public ResponseEntity findAllOrders() {
        List<Order> orders = respository.findAll();

        if(orders == null || orders.size() <= 0)
            return ResponseEntity.badRequest().body(new OrderException("Nenhum pedido encontrado"));
        List<OrderDTO> ordersDTO = new ArrayList<>();
        for(Order order: orders)
            ordersDTO.add(converter.convertTo(order));


        return ResponseEntity.ok().body(ordersDTO);
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
        Order item = respository.findById(id).get();
        if(item == null || id == null)
            return ResponseEntity.badRequest().body(new OrderException("Erro ao encontrar o pedido"));
        OrderDTO oDTO = converter.convertTo(item);
        return ResponseEntity.ok().body(oDTO);
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

        Order orderEntity = converter.convertTo(order   );

        Order returnOrder = respository.save(orderEntity);
        order.setId(returnOrder.getId());

        return ResponseEntity.ok().body(returnOrder);
    }

    @Override
    public void deleteOrder(Long id) {
        respository.deleteById(id);
    }
}
