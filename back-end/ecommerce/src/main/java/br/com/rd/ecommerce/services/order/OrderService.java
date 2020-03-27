package br.com.rd.ecommerce.services.order;

import br.com.rd.ecommerce.models.dto.OrderDTO;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface OrderService {
    ResponseEntity<?> findByDate(String date);
    ResponseEntity<?> findById(Long id);
    ResponseEntity<?> createOrder(OrderDTO order);
    void deleteOrder(Long id);
}
