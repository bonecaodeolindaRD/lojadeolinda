package br.com.rd.ecommerce.repositories;


import br.com.rd.ecommerce.models.entities.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StatusRepository extends JpaRepository<Status, Long> {

    List<Status> findByIdStatus(Long id);
    List<Status> findByStatus(String status);
}
