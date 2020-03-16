package br.com.rd.ecommerce.controllers;

import br.com.rd.ecommerce.models.entities.Status;
import br.com.rd.ecommerce.repositories.StatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

public class StatusController {

    @Autowired
    public StatusRepository statusRepository;

    @PostMapping("/create-status")
    public Status save(@RequestBody Status status) {
        return statusRepository.save(status);
    }

    @GetMapping("/status/{id}")
    public Status findById(@PathVariable("id") Long id) {
        return statusRepository.findById(id).get();
    }

    @DeleteMapping("/status/{id}")
    public void deleteById(@PathVariable("id") Long id) {
        statusRepository.deleteById(id);
    }

    @PutMapping("/status")
    public Status update(@RequestBody Status status) {
        Status statusEntity = statusRepository.findById(status.getIdStatus()).get();
        statusEntity.setStatus(status.getStatus());
        return statusRepository.save(statusEntity);
    }




}
