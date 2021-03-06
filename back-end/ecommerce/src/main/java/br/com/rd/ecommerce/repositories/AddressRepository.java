package br.com.rd.ecommerce.repositories;

import br.com.rd.ecommerce.models.entities.Address;
import br.com.rd.ecommerce.models.entities.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AddressRepository extends JpaRepository<Address,Long> {
    Optional<List<Address>> findByStreet(String street);
    Optional<List<Address>> findByCep(String cep);
    Optional<List<Address>> findByClient(Client client);
}
