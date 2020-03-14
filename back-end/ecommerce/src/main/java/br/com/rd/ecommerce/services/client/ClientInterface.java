package br.com.rd.ecommerce.services.client;

import br.com.rd.ecommerce.models.entities.Client;
import org.springframework.http.ResponseEntity;

public interface ClientInterface {
    ResponseEntity findAllClient();
    ResponseEntity findClientById(Long id);
    void deleteClient(Long id);
    ResponseEntity findClientByEmail(String email);
    //ResponseEntity createClient(Client client);
}
