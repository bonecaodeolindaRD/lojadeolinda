package br.com.rd.ecommerce.controllers;

import br.com.rd.ecommerce.models.entities.Client;
import br.com.rd.ecommerce.models.dto.ClientDTO;
import br.com.rd.ecommerce.services.client.ClientServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ClientController {
    @Autowired
    private ClientServiceImpl service;
    
    @PostMapping("/client/new")
    public ResponseEntity createClient(@RequestBody ClientDTO clientDTO){
        return service.createClient(clientDTO);
    }

    @GetMapping("/client/list")
    public ResponseEntity findAll(){
            return service.findAllClient();
    }

    @GetMapping("/client/id/{id}")
    public ResponseEntity<Client> findById(@PathVariable("id") Long id){
        return service.findClientById(id);
    }

    @GetMapping("/client/email/{email}")
    public ResponseEntity findByEmail(@PathVariable("email") String email){
        return service.findClientByEmail(email);
    }

    @PostMapping("/client/login")
    public ResponseEntity login(@RequestBody ClientDTO clientDTO){
        return service.findClientLogin(clientDTO.getEmail(), clientDTO.getPassword());
    }

    @DeleteMapping("/client/delete/{id}")
    public void deleteClient(@PathVariable("id") Long id){
        service.deleteClient(id);
    }

}
