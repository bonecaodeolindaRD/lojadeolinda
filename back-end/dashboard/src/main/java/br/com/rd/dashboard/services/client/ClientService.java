package br.com.rd.dashboard.services.client;

import br.com.rd.dashboard.models.dto.ClientDTO;
import br.com.rd.dashboard.models.entities.Client;
import org.springframework.http.ResponseEntity;

public interface ClientService {
    ResponseEntity<?> findAllClient();
    ResponseEntity<?> findClientById(Long id);
    void deleteClient(Long id);
    ResponseEntity<?> findClientByEmail(String email);
    ResponseEntity<?> findClientLogin(Client client);
    ResponseEntity<?> findClientOrders(String email);
    ResponseEntity<?> createClient(Client client);
    ResponseEntity<?> findClientAddress(String email);
}
