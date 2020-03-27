package br.com.rd.ecommerce.controllers;

import br.com.rd.ecommerce.models.dto.StatusDTO;
import br.com.rd.ecommerce.models.entities.Status;
import br.com.rd.ecommerce.repositories.StatusRepository;
import br.com.rd.ecommerce.services.status.StatusServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class StatusController {

    @Autowired
    public StatusServiceImpl service;

    @PostMapping("/status/new")
    public ResponseEntity save(@RequestBody StatusDTO status) {
        return service.createStatus(status);
    }

    @GetMapping("/status/id/{id}")
    public ResponseEntity findById(@PathVariable("id") Long id) {
        return service.findStatusById(id);
    }

    @DeleteMapping("/status/{id}")
    public void deleteById(@PathVariable("id") Long id) {
        service.deleteStatus(id);
    }

    @PutMapping("/status/update")
    public ResponseEntity update(@RequestBody StatusDTO status) {
        return service.updateStatus(status);
    }




}
