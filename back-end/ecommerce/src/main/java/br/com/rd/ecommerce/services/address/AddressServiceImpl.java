package br.com.rd.ecommerce.services.address;

import br.com.rd.ecommerce.converters.Converter;
import br.com.rd.ecommerce.models.dto.AddressDTO;
import br.com.rd.ecommerce.models.dto.ClientDTO;
import br.com.rd.ecommerce.models.entities.Address;
import br.com.rd.ecommerce.models.entities.Client;
import br.com.rd.ecommerce.repositories.AddressRepository;
import br.com.rd.ecommerce.services.exceptions.AddressException;
import net.bytebuddy.asm.Advice;
import org.hibernate.JDBCException;
import org.hibernate.exception.SQLGrammarException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.server.ResponseStatusException;

import javax.persistence.EntityNotFoundException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Service
public class AddressServiceImpl implements AddressService {

    @Autowired
    private AddressRepository repository;
    private Converter converter = new Converter();

    @Override
    public ResponseEntity<?> findAllAddress() {
        List<Address> addresses = repository.findAll();
        if (addresses.size() <= 0)
            return ResponseEntity.notFound().build();
        List<AddressDTO> addressDTOS = new ArrayList<>();
        for (Address a : addresses)
            addressDTOS.add(converter.convertTo(a));
        return ResponseEntity.status(HttpStatus.OK).body(addressDTOS);
    }

    @Override
    public ResponseEntity<?> createAddress(AddressDTO addressDTO) {
        if (addressDTO == null)
            return ResponseEntity.badRequest().body(new AddressException("O endereco e invalido"));

        Address address = converter.convertTo(addressDTO);
        if(addressDTO.getClient() != null)
            address.setClient(converter.convertTo(addressDTO.getClient()));

        AddressDTO addressReturn = converter.convertTo(repository.save(address));
        return ResponseEntity.status(201).body(addressReturn);

    }

    @Override
    public void deleteAddress(Long id) {
        repository.deleteById(id);
    }

    @Override
    public ResponseEntity<?> updateAddress(Long id, AddressDTO addressDTO) {
        if (addressDTO == null)
            return ResponseEntity.badRequest().body(new AddressException("Endereco invalido"));

        Address address = repository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Address not found"));
        address.setStreet(addressDTO.getStreet());
        address.setNumber(addressDTO.getNumber());
        address.setDistrict(addressDTO.getDistrict());
        address.setCep(addressDTO.getCep());
        address.setUf(addressDTO.getUf());
        Address addressReturn = repository.save(address);
        return ResponseEntity.status(HttpStatus.OK).body(addressReturn);
    }

}
