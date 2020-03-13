package br.com.rd.ecommerce.services.order;

import br.com.rd.ecommerce.converters.Converter;
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
            ordersDTO.add(converter.orderToOrderDTO(order));


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
                ordersDTO.add(converter.orderToOrderDTO(order));

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
        OrderDTO oDTO = converter.orderToOrderDTO(item);
        return ResponseEntity.ok().body(oDTO);
    }

    @Override
    public ResponseEntity createOrder(OrderDTO order) {

        if(order == null || order.getClient() == null)
            return ResponseEntity.badRequest().body(new OrderException("Cliente não informado"));

        if(order.getOrderItem() == null || order.getOrderItem().size() <= 0)
            return ResponseEntity.badRequest().body(new OrderException("O pedido não contem items"));

        Order orderEntity = new Order();
        orderEntity.setValue(order.getValue());
        orderEntity.setDate(order.getDate());

        Client client = new Client();
        client.setId(order.getClient().getId());

        orderEntity.setClient(client);
        orderEntity.setStatus(order.getStatus());
        Address address = new Address();
        address.setId(order.getAddress().getId());
        orderEntity.setAddress(address);
        orderEntity.setStatus(order.getStatus());

        List<OrderItem> items = new ArrayList<>();
        for(OrderItemDTO item: order.getOrderItem()){
            OrderItem it = new OrderItem();
            it.setProduct(item.getProduct());
            it.setQuantity(item.getQuantity());
            it.setValue(item.getValue());
            items.add(it);
        }
        orderEntity.setOrderItem(items);

        Order returnOrder = respository.save(orderEntity);
        order.setId(returnOrder.getId());

        return ResponseEntity.ok().body(returnOrder);
    }

    @Override
    public void deleteOrder(Long id) {
        respository.deleteById(id);
    }
}
