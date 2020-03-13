package br.com.rd.ecommerce.services;

import br.com.rd.ecommerce.models.dto.ClientDTO;
import br.com.rd.ecommerce.models.entities.Client;

import br.com.rd.ecommerce.models.entities.Product;
import br.com.rd.ecommerce.repositories.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service("Client Service")
public class ClientService {
    @Autowired
    ClientRepository clientRepository;

    public ResponseEntity save(ClientDTO clientDTO){
        Client clientEntity = new Client();
        clientEntity.setName(clientDTO.getName());
        clientEntity.setCPF(clientDTO.getCPF());
        clientEntity.setEmail(clientDTO.getEmail());
        clientEntity.setPassword(clientDTO.getPassword());
        clientEntity.setPhoneNumber(clientDTO.getPhoneNumber());
        clientEntity.setOrders(clientDTO.getOrders());
        clientEntity.setAddresses(clientDTO.getAddresses());

        Client returnEntity = clientRepository.save(clientEntity);
        clientDTO.setId(returnEntity.getId());
        return ResponseEntity.ok().body(clientDTO);
    }

    //TODO TERMINAR A CONSULTA E IMPLEMENTAR NO CONTROLLER
    public ResponseEntity<List<Client>> findAllClient() {
        List<Client> client = clientRepository.findAll();

        if(client == null || client.size() <= 0)
            return ResponseEntity.badRequest().body(new ClientException("Nenhum pedido encontrado"));
        List<ClientDTO> clientDTO = new ArrayList<>();
        for(Client client: clients)
            clientDTO.add(converter.clientToClientDTO(client));


        return ResponseEntity.ok().body(clientDTO);
    }

}

