package br.com.rd.ecommerce.services.client;

import br.com.rd.ecommerce.models.dto.ClientDTO;
import br.com.rd.ecommerce.models.entities.Client;
import org.springframework.http.ResponseEntity;


public interface ClientService {
    ResponseEntity<?> findClientById(Long id);
    ResponseEntity<?> findClientByEmail(String email);
    ResponseEntity<?> findClientLogin(Client client);
    ResponseEntity<?> findClientOrders(String email);
    ResponseEntity<?> createClient(Client client);
    ResponseEntity<?> findClientAddress(String email);
    ResponseEntity<?> updateClient(Long id, ClientDTO client);
}
