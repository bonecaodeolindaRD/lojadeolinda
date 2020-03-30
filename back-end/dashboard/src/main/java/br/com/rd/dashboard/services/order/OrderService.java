package br.com.rd.dashboard.services.order;

import br.com.rd.dashboard.models.dto.OrderDTO;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface OrderService {
    ResponseEntity<?> findAllOrders();
    ResponseEntity<?> findByDate(String date);
    ResponseEntity<?> findById(Long id);
    ResponseEntity<?> findSales();
    ResponseEntity<?> cancelOrder(Long id);
    ResponseEntity<?> findByDateAndStatus(String date, Long status);
    ResponseEntity<?> findByStatus(Long id);
    void deleteOrder(Long id);
}
