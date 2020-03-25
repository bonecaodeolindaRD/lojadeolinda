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
    public ResponseEntity<?> findAddressById(Long id) {
        Address address = repository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Address not found"));
        if (address == null)
            return ResponseEntity.notFound().build();
        AddressDTO addressDTO = converter.convertTo(address);
        return ResponseEntity.status(HttpStatus.OK).body(addressDTO);
    }

    @Override
    public ResponseEntity<?> findAddressByClient(ClientDTO client) {
        if (client == null)
            return ResponseEntity.badRequest().body(new AddressException("Please inform a client"));
        Client c = converter.convertTo(client);

        List<Address> addresses = repository.findByClient(c).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Address not found"));

        List<AddressDTO> aDTO = new ArrayList<>();
        for (Address a : addresses)
            aDTO.add(converter.convertTo(a));

        return ResponseEntity.status(HttpStatus.OK).body(aDTO);
    }

    @Override
    public ResponseEntity<?> findAddressByCEP(String CEP) {

        List<Address> addresses = repository.findByCep(CEP).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Address not found"));
        List<AddressDTO> aDTO = new ArrayList<>();
        for (Address a : addresses)
            aDTO.add(converter.convertTo(a));
        return ResponseEntity.status(HttpStatus.OK).body(aDTO);
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


    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<?> handlerEntityExceptionException(EntityNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex);
    }

    @ExceptionHandler(SQLException.class)
    public ResponseEntity<?> handlerSQLException(SQLException ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex);
    }

    @ExceptionHandler(JDBCException.class)
    public ResponseEntity<?> handlerJDBCException(JDBCException ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex);
    }

    @ExceptionHandler(SQLGrammarException.class)
    public ResponseEntity<?> handlerSQLGrammarException(SQLGrammarException ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleException(Exception ex){
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex);
    }
}
