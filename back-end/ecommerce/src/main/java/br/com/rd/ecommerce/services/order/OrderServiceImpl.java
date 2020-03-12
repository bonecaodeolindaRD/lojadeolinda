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


    @Override
    public ResponseEntity findAllOrders() {
        List<Order> orders = respository.findAll();

        if(orders == null || orders.size() <= 0)
            return ResponseEntity.badRequest().body(new OrderException("Nenhum pedido encontrado"));
        List<OrderDTO> ordersDTO = new ArrayList<>();
        for(Order order: orders){
            OrderDTO orderDTO = new OrderDTO();
            AddressDTO aDTO = new AddressDTO();
            aDTO.setCEP(order.getAddress().getCEP());
            aDTO.setDistrict(order.getAddress().getDistrict());
            aDTO.setId(order.getAddress().getId());
            aDTO.setNumber(order.getAddress().getNumber());
            aDTO.setStreet(order.getAddress().getStreet());
            aDTO.setUF(order.getAddress().getUF());
            orderDTO.setAddress(aDTO);
            orderDTO.setId(order.getId());
            orderDTO.setValue(order.getValue());
            orderDTO.setDate(order.getDate());
            orderDTO.setStatus(order.getStatus());
            // TODO implementar ClientDTO
            ClientDTO clientDTO = new ClientDTO();
            clientDTO.setAddresses(null);
            clientDTO.setCPF(order.getClient().getCPF());
            clientDTO.setEmail(order.getClient().getEmail());
            clientDTO.setId(order.getClient().getId());
            clientDTO.setName(order.getClient().getName());
            clientDTO.setPhoneNumber(order.getClient().getPhoneNumber());
            clientDTO.setOrders(null);
            orderDTO.setClient(clientDTO);
            for(OrderItem oi: order.getOrderItem()){
                OrderItemDTO oiDTO = new OrderItemDTO();
                oiDTO.setId(oi.getId());
                oiDTO.setProduct(oi.getProduct());
                oiDTO.setQuantity(oi.getQuantity());
                oiDTO.setValue(oi.getValue());
                orderDTO.addItem(oiDTO);
            }
            ordersDTO.add(orderDTO);
        }

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
            for(Order order: orders){
                OrderDTO orderDTO = new OrderDTO();
                AddressDTO aDTO = new AddressDTO();
                aDTO.setCEP(order.getAddress().getCEP());
                aDTO.setDistrict(order.getAddress().getDistrict());
                aDTO.setId(order.getAddress().getId());
                aDTO.setNumber(order.getAddress().getNumber());
                aDTO.setStreet(order.getAddress().getStreet());
                aDTO.setUF(order.getAddress().getUF());
                orderDTO.setAddress(aDTO);
                orderDTO.setId(order.getId());
                orderDTO.setValue(order.getValue());
                orderDTO.setDate(order.getDate());
                orderDTO.setStatus(order.getStatus());
                ClientDTO clientDTO = new ClientDTO();
                clientDTO.setAddresses(null);
                clientDTO.setCPF(order.getClient().getCPF());
                clientDTO.setEmail(order.getClient().getEmail());
                clientDTO.setId(order.getClient().getId());
                clientDTO.setName(order.getClient().getName());
                clientDTO.setPhoneNumber(order.getClient().getPhoneNumber());
                clientDTO.setOrders(null);
                orderDTO.setClient(clientDTO);
                for(OrderItem oi: order.getOrderItem()){
                    OrderItemDTO oiDTO = new OrderItemDTO();
                    oiDTO.setId(oi.getId());
                    oiDTO.setProduct(oi.getProduct());
                    oiDTO.setQuantity(oi.getQuantity());
                    oiDTO.setValue(oi.getValue());
                    orderDTO.addItem(oiDTO);
                }
                ordersDTO.add(orderDTO);
            }

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
        OrderDTO oDTO = new OrderDTO();
        ClientDTO clientDTO = new ClientDTO();
        clientDTO.setAddresses(null);
        clientDTO.setCPF(item.getClient().getCPF());
        clientDTO.setEmail(item.getClient().getEmail());
        clientDTO.setId(item.getClient().getId());
        clientDTO.setName(item.getClient().getName());
        clientDTO.setPhoneNumber(item.getClient().getPhoneNumber());
        clientDTO.setOrders(null);
        oDTO.setClient(clientDTO);
        oDTO.setStatus(item.getStatus());
        oDTO.setDate(item.getDate());
        AddressDTO aDTO = new AddressDTO();
        aDTO.setCEP(item.getAddress().getCEP());
        aDTO.setDistrict(item.getAddress().getDistrict());
        aDTO.setId(item.getAddress().getId());
        aDTO.setNumber(item.getAddress().getNumber());
        aDTO.setStreet(item.getAddress().getStreet());
        aDTO.setUF(item.getAddress().getUF());
        oDTO.setAddress(aDTO);
        oDTO.setValue(item.getValue());
        for(OrderItem oi: item.getOrderItem()){
            OrderItemDTO oiDTO = new OrderItemDTO();
            oiDTO.setValue(oi.getValue());
            oiDTO.setQuantity(oi.getQuantity());
            oiDTO.setProduct(oi.getProduct());
            oiDTO.setId(oi.getId());
            oDTO.addItem(oiDTO);
        }
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
