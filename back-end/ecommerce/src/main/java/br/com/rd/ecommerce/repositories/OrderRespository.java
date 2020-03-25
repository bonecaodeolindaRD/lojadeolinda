package br.com.rd.ecommerce.repositories;

import br.com.rd.ecommerce.models.entities.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface OrderRespository extends JpaRepository<Order, Long> {
    Optional<List<Order>> findByDate(Date date);
    Optional<List<Order>> findByClient(Client client);
    Optional<List<Order>> findByStatus(Status status);
}
