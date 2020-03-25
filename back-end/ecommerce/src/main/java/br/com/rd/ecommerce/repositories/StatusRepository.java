package br.com.rd.ecommerce.repositories;


import br.com.rd.ecommerce.models.entities.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StatusRepository extends JpaRepository<Status, Long> {

    Optional<Status> findByIdStatus(Long id);
    Optional<List<Status>> findByStatus(String status);
}
