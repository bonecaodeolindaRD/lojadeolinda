package br.com.rd.ecommerce.repositories;

import br.com.rd.ecommerce.models.entities.Client;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<Client, Long> {
    public Client findByEmail(String email);
}
