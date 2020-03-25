package br.com.rd.ecommerce.controllers;

import br.com.rd.ecommerce.models.dto.StatusDTO;
import br.com.rd.ecommerce.services.status.StatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class StatusController {

    @Autowired
    public StatusService service;

    @PostMapping("/status")
    public ResponseEntity<?> save(@RequestBody StatusDTO status) {
        return service.createStatus(status);
    }

    @GetMapping("/status/{id}")
    public ResponseEntity<?> findById(@PathVariable("id") Long id) {
        return service.findStatusById(id);
    }

    @DeleteMapping("/status/{id}")
    public void deleteById(@PathVariable("id") Long id) {
        service.deleteStatus(id);
    }

    @PutMapping("/status/{id}")
    public ResponseEntity<?> update(@PathVariable("id") Long id, @RequestBody StatusDTO status) {
        return service.updateStatus(id, status);
    }




}
