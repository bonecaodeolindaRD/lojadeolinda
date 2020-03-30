package br.com.rd.dashboard.controllers;

import br.com.rd.dashboard.models.dto.OrderDTO;
import br.com.rd.dashboard.services.order.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
public class OrderController {

    @Autowired
    private OrderService service;

    @GetMapping("/order")
    public ResponseEntity<?> findAll(){
        return service.findAllOrders();
    }

    @GetMapping("/order/date/{date}")
    public ResponseEntity<?> findByDate(@PathVariable("date") String date){
        return service.findByDate(date);
    }

    @GetMapping("/order/{id}")
    public ResponseEntity<?> findById(@PathVariable("id") Long id){
        return service.findById(id);
    }

    @GetMapping("/sales")
    public ResponseEntity<?> findSales(){
        return service.findSales();
    }

    @DeleteMapping("/order/{id}")
    public void deleteOrder(@PathVariable("id") Long id){
        service.deleteOrder(id);
    }

    @PostMapping("/order/cancel/{id}")
    public ResponseEntity<?> cancelOrder(@PathVariable("id") Long id){
        return service.cancelOrder(id);
    }
}
