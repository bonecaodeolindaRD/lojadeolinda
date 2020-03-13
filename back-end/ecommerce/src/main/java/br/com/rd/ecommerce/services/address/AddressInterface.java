package br.com.rd.ecommerce.services.address;

import br.com.rd.ecommerce.models.entities.Address;
import org.springframework.http.ResponseEntity;

public interface AddressInterface {
    ResponseEntity findAllStreet();
    ResponseEntity findByStreet(String street);
    ResponseEntity createAddress(Address address);
}
