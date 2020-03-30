package br.com.rd.dashboard.repositories;

import br.com.rd.dashboard.models.entities.*;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.awt.print.Pageable;
import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface OrderRespository extends JpaRepository<Order, Long> {
    Optional<List<Order>> findByDate(Date date);
    Optional<List<Order>> findByStatusAndDate(Status status, Date date);
    Optional<List<Order>> findByStatus(Status status);
}
