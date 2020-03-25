package br.com.rd.ecommerce.repositories;

import br.com.rd.ecommerce.models.entities.Provider;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProviderRepository extends JpaRepository<Provider, Long> {
    Optional<List<Provider>> findByName(String name);
}
