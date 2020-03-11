package br.com.rd.ecommerce.services.Order;

import br.com.rd.ecommerce.models.entities.Client;
import br.com.rd.ecommerce.models.entities.Invoice;
import br.com.rd.ecommerce.models.entities.Order;
import org.springframework.http.ResponseEntity;

import java.util.Date;
import java.util.List;

public interface OrderService {
    ResponseEntity<List<Order>> findAllOrders();
    ResponseEntity<List<Order>> findByDate(String date);
    ResponseEntity<Order> findById(Long id);
    ResponseEntity<List<Order>> findByClient(Client client);
}
