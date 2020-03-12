package br.com.rd.ecommerce.controllers;

import br.com.rd.ecommerce.models.dto.OrderDTO;
import br.com.rd.ecommerce.models.entities.Order;
import br.com.rd.ecommerce.services.order.OrderServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
public class OrderController {

    @Autowired
    private OrderServiceImpl service;

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

    @PostMapping("/order/new")
    public ResponseEntity createOrder(@RequestBody OrderDTO order){
        return service.createOrder(order);
    }
}
