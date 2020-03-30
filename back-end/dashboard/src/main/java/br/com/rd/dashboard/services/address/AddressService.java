package br.com.rd.dashboard.services.address;

import br.com.rd.dashboard.models.dto.AddressDTO;
import br.com.rd.dashboard.models.dto.ClientDTO;
import org.springframework.http.ResponseEntity;

public interface AddressService {
    ResponseEntity<?> findAllAddress();
    ResponseEntity<?> findAddressById(Long id);
    ResponseEntity<?> findAddressByClient(ClientDTO client);
    ResponseEntity<?> findAddressByCEP(String CEP);
    ResponseEntity<?> createAddress(AddressDTO addressDTO);
    void deleteAddress(Long id);
    ResponseEntity<?> updateAddress(Long id, AddressDTO addressDTO);
}
