package br.com.rd.dashboard.controllers;

import br.com.rd.dashboard.models.dto.OrderDTO;
import br.com.rd.dashboard.services.order.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import javax.websocket.server.PathParam;
import java.util.List;

@RestController
public class OrderController {

    @Autowired
    private OrderService service;

    @GetMapping("/order")
    public ResponseEntity<?> findAll() {
        return service.findAllOrders();
    }

    @GetMapping("/order/page/{page}")
    public ResponseEntity<?> findByPage(@PathVariable("page") Integer page){
        return service.findAll(page);
    }

    @GetMapping("/order/status/{id}")
    public ResponseEntity<?> findByStatus(@PathVariable("id") Long id){
        return service.findByStatus(id);
    }

    @GetMapping("/order/{date}/{status}")
    public ResponseEntity<?> findByDateAndStatus(@PathVariable("date") String date, @PathVariable("status") Long status){
        return service.findByDateAndStatus(date, status);
    }

    @GetMapping("/order/date/{date}")
    public ResponseEntity<?> findByDate(@PathVariable("date") String date) {
        return service.findByDate(date);
    }

    @GetMapping("/order/date/{date}/{page}")
    public ResponseEntity<?> findByDatePage(@PathVariable("date") String date, @PathVariable("page") Integer page) {
        return service.findByDatePage(date, page);
    }

    @GetMapping("/order/{id}")
    public ResponseEntity<?> findById(@PathVariable("id") Long id) {
        return service.findById(id);
    }

    @GetMapping("/sales")
    public ResponseEntity<?> findSales() {
        return service.findSales();
    }

    @DeleteMapping("/order/{id}")
    public void deleteOrder(@PathVariable("id") Long id) {
        service.deleteOrder(id);
    }

    @PostMapping("/order/cancel/{id}")
    public ResponseEntity<?> cancelOrder(@PathVariable("id") Long id) {
        return service.cancelOrder(id);
    }
}
