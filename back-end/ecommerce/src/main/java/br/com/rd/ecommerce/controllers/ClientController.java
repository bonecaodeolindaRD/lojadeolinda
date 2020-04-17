package br.com.rd.ecommerce.controllers;

import br.com.rd.ecommerce.models.dto.StatusDTO;
import br.com.rd.ecommerce.models.entities.Client;
import br.com.rd.ecommerce.models.dto.ClientDTO;
import br.com.rd.ecommerce.services.client.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
public class ClientController {
    @Autowired
    private ClientService service;
    
    @PostMapping("/client")
    public ResponseEntity<?> createClient(@Valid @RequestBody Client clientDTO){
        return service.createClient(clientDTO);
    }

    @GetMapping("/client/{id}")
    public ResponseEntity<?> findById(@PathVariable("id") Long id){
        return service.findClientById(id);
    }

    @GetMapping("/client/email/{email}")
    public ResponseEntity<?> findByEmail(@PathVariable("email") String email){
        return service.findClientByEmail(email);
    }

    @GetMapping("/client/orders/{email}")
    public ResponseEntity<?> findClientOrders(@PathVariable("email") String email){
         return service.findClientOrders(email);
    }

    @GetMapping("/client/addresses/{email}")
    public ResponseEntity<?> findClientAddress(@PathVariable("email") String email){
        return service.findClientAddress(email);
    }

    @PostMapping("/client/login")
    public ResponseEntity<?> login(@RequestBody Client client){
        return service.findClientLogin(client);
    }


    @PutMapping("/client/{id}")
    public ResponseEntity<?> update(@PathVariable("id") Long id, @RequestBody ClientDTO client) {
        return service.updateClient(id, client);
    }
}
