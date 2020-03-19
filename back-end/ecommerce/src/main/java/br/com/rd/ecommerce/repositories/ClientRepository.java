package br.com.rd.ecommerce.repositories;

import br.com.rd.ecommerce.models.entities.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {
    List<Client> findByName(String name);
    Client findByEmail(String email);
    Client findByEmailAndPassword(String email, String password);
}
