package br.com.rd.ecommerce.services.address;

import br.com.rd.ecommerce.models.dto.AddressDTO;
import br.com.rd.ecommerce.models.dto.ClientDTO;
import br.com.rd.ecommerce.models.entities.Client;
import org.springframework.http.ResponseEntity;

public interface AddressService {
    ResponseEntity findAllAddress();
    ResponseEntity findAddressById(Long id);
    ResponseEntity findAddressByClient(ClientDTO client);
    ResponseEntity findAddressByCEP(String CEP);
    ResponseEntity createAddress(AddressDTO addressDTO);
    void deleteAddress(Long id);
    ResponseEntity updateAddress(AddressDTO addressDTO);
}
