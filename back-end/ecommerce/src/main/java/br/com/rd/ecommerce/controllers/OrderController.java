package br.com.rd.ecommerce.controllers;

import br.com.rd.ecommerce.models.entities.Order;
import br.com.rd.ecommerce.services.Order.OrderServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@RestController
public class OrderController {
    private OrderServiceImpl service = new OrderServiceImpl();

    @GetMapping("/order/all")
    public ResponseEntity<List<Order>> findAll(){
        return service.findAllOrders();
    }

    @GetMapping("/order/date/{date}")
    public ResponseEntity<List<Order>> findByDate(@PathVariable("date") String date){
        return service.findByDate(date);
    }

    @GetMapping("/order/id/{id}")
    public ResponseEntity<Order> findById(@PathVariable("id") Long id){
        return service.findById(id);
    }
}
