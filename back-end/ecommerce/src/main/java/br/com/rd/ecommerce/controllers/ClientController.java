package br.com.rd.ecommerce.controllers;

import br.com.rd.ecommerce.models.entities.Client;
import br.com.rd.ecommerce.models.dto.ClientDTO;
import br.com.rd.ecommerce.services.client.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ClientController {
    @Autowired
    private ClientService service;
    
    @PostMapping("/client/new")
    public ResponseEntity createClient(@RequestBody ClientDTO clientDTO){
        return service.createClient(clientDTO);
    }

    @GetMapping("/client/list")
    public ResponseEntity<List<Client>> findAll(){
            return service.findAllClient();
    }

    @GetMapping("/client/id/{id}")
    public ResponseEntity<Client> findById(@PathVariable("id") Long id){
        return service.findClientById(id);
    }

    @GetMapping("/client/email/{email}")
    public ResponseEntity<Client> findByEmail(@PathVariable("email") String email){
        return service.findClientByEmail(email);
    }

    @DeleteMapping("/client/delete/{id}")
    public void deleteClient(@PathVariable("id") Long id){
        service.deleteClient(id);
    }

}
