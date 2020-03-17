package br.com.rd.ecommerce.repositories;

import br.com.rd.ecommerce.models.entities.Address;
import br.com.rd.ecommerce.models.entities.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AddressRepository extends JpaRepository<Address,Long> {
    List<Address> findByStreet(String street);
    List<Address> findByCep(String cep);
    List<Address> findByClient(Client client);
}
