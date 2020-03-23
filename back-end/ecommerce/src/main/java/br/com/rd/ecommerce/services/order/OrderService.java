package br.com.rd.ecommerce.services.order;

import br.com.rd.ecommerce.models.dto.OrderDTO;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface OrderService {
    ResponseEntity findAllOrders();
    ResponseEntity findByDate(String date);
    ResponseEntity findById(Long id);
//    ResponseEntity<List<OrderDTO>> findByClient(Client client);
    ResponseEntity createOrder(OrderDTO order);
    ResponseEntity findSales();
    void deleteOrder(Long id);
}
