package br.com.rd.dashboard.repositories;

import br.com.rd.dashboard.models.entities.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface OrderRespository extends JpaRepository<Order, Long> {
    Optional<List<Order>> findByDate(Date date);
    Optional<List<Order>> findByStatusAndDate(Status status, Date date);
    Optional<List<Order>> findByStatus(Status status);

    @Query("select o from Order o where o.date like '%:date'")
    Page<Order> searchByDate(String date, Pageable pageable);
}
