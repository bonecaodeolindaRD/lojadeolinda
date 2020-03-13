package br.com.rd.ecommerce.controllers;

import br.com.rd.ecommerce.models.entities.Client;
import br.com.rd.ecommerce.models.dto.ClientDTO;
import br.com.rd.ecommerce.services.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ClientController {
    @Autowired
    private ClientService service;
    
    @PostMapping("/client-create")
    public ResponseEntity save(@RequestBody ClientDTO clientDTO){
        return ResponseEntity.ok().body(service.save(clientDTO));
    }

    @GetMapping("/client/list")
    public ResponseEntity<List<Client>> findAll(){
        return service.findAllClient();
    }

}
