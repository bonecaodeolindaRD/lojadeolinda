package br.com.rd.ecommerce.repositories;

import br.com.rd.ecommerce.models.entities.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface OrderRespository extends JpaRepository<Order, Long> {
    List<Order> findByDate(Date date);
    List<Order> findByClient(Client client);
    List<Order> findByStatus(Status status);
    List<Order> findByEmail(String email);
}
