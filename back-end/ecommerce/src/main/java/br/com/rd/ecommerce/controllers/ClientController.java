package br.com.rd.ecommerce.controllers;

import br.com.rd.ecommerce.models.entities.Client;
import br.com.rd.ecommerce.repositories.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ClientController {
    @Autowired
    private ClientRepository clientRepository;

    @CrossOrigin
    @PostMapping("/client-create")
    public Client save(@RequestBody Client client){
        return clientRepository.save(client);
    }

    @GetMapping("/client/list")
    public List<Client> find() {
        return clientRepository.findAll();
    }

    @GetMapping("/client/{id}")
    public Client findClientById(@PathVariable("id")Long id){
        return clientRepository.findById(id).get();
    }

    @PutMapping("/client")
    public Client edit(@RequestBody Client client){
        Client clientEntity = clientRepository.getOne(client.getId());
        clientEntity.setName(client.getName());
        clientEntity.setCPF(client.getCPF());
        clientEntity.setEmail(client.getEmail());
        clientEntity.setPhoneNumber(client.getPhoneNumber());
        clientEntity.setPassword(client.getPassword());
        clientEntity.setAddresses(client.getAddresses());
        clientEntity.setOrders(client.getOrders());

        return clientRepository.save(clientEntity);
    }

    @DeleteMapping("/client/{id}")
    public void deleteById(@PathVariable("id")Long id){
        clientRepository.deleteById(id);
    }

}
