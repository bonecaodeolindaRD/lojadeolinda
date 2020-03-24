package br.com.rd.ecommerce.services.address;

import br.com.rd.ecommerce.converters.Converter;
import br.com.rd.ecommerce.models.dto.AddressDTO;
import br.com.rd.ecommerce.models.dto.ClientDTO;
import br.com.rd.ecommerce.models.entities.Address;
import br.com.rd.ecommerce.models.entities.Client;
import br.com.rd.ecommerce.repositories.AddressRepository;
import br.com.rd.ecommerce.services.exceptions.AddressException;
import net.bytebuddy.asm.Advice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AddressServiceImpl implements AddressService {

    @Autowired
    private AddressRepository repository;
    private Converter converter = new Converter();

    @Override
    public ResponseEntity<?> findAllAddress() {
        try {
            List<Address> addresses = repository.findAll();
            if (addresses == null || addresses.size() <= 0)
                return ResponseEntity.notFound().build();
            List<AddressDTO> addressDTOS = new ArrayList<>();
            for (Address a : addresses)
                addressDTOS.add(converter.convertTo(a));
            return ResponseEntity.ok().body(addressDTOS);
        } catch(Exception e){
            return ResponseEntity.badRequest().body(new AddressException("Erro" + e.getMessage()));
        }
    }

    @Override
    public ResponseEntity<?> findAddressById(Long id) {
        if(id == null || id <= 0)
            return ResponseEntity.badRequest().body(new AddressException("Favor informe o id de um endereco"));
        try {
            Address address = repository.findById(id).orElse(null);
            if (address == null)
                return ResponseEntity.notFound().build();
            AddressDTO addressDTO = converter.convertTo(address);

            return ResponseEntity.ok().body(addressDTO);
        } catch(Exception e){
            return ResponseEntity.badRequest().body(new AddressException("Erro" + e.getMessage()));
        }

    }

    @Override
    public ResponseEntity<?> findAddressByClient(ClientDTO client) {
        if(client == null)
            return ResponseEntity.badRequest().body(new AddressException("Favor informe um cliente"));
        Client c = converter.convertTo(client);
        try {
            List<Address> addresses = repository.findByClient(c);
            if (addresses == null || addresses.size() <= 0)
                return ResponseEntity.notFound().build();
            List<AddressDTO> aDTO = new ArrayList<>();
            for (Address a : addresses)
                aDTO.add(converter.convertTo(a));

            return ResponseEntity.ok().body(aDTO);
        } catch(Exception e){
            return ResponseEntity.badRequest().body(new AddressException("Erro" + e.getMessage()));
        }
    }

    @Override
    public ResponseEntity<?> findAddressByCEP(String CEP) {
        if(CEP == null || CEP.length() <= 0 || CEP.length() > 8)
            return ResponseEntity.badRequest().body(new AddressException("CEP informado e invalido"));
        try {
            List<Address> addresses = repository.findByCep(CEP);
            if (addresses == null || addresses.size() <= 0)
                return ResponseEntity.notFound().build();
            List<AddressDTO> aDTO = new ArrayList<>();
            for (Address a : addresses)
                aDTO.add(converter.convertTo(a));

            return ResponseEntity.ok().body(aDTO);
        } catch(Exception e){
            return ResponseEntity.badRequest().body(new AddressException("Erro" + e.getMessage()));
        }

    }

    @Override
    public ResponseEntity<?> createAddress(AddressDTO addressDTO) {
        if(addressDTO == null)
            return ResponseEntity.badRequest().body(new AddressException("O endereco e invalido"));
        Address address = converter.convertTo(addressDTO);
        try {
            Address addressReturn = repository.save(address);
            return ResponseEntity.status(201).body(addressReturn);
        } catch(Exception e){
            return ResponseEntity.badRequest().body(new AddressException("Erro" + e.getMessage()));
        }
    }

    @Override
    public void deleteAddress(Long id) {
        repository.deleteById(id);
    }

    @Override
    public ResponseEntity<?> updateAddress(AddressDTO addressDTO) {
        if(addressDTO == null)
            return ResponseEntity.badRequest().body(new AddressException("Endereco invalido"));
        try {
            Address address = repository.findById(addressDTO.getId()).get();
            address.setStreet(addressDTO.getStreet());
            address.setNumber(addressDTO.getNumber());
            address.setDistrict(addressDTO.getDistrict());
            address.setCep(addressDTO.getCep());
            address.setUf(addressDTO.getUf());
            Address addressReturn = repository.save(address);
            return ResponseEntity.ok().body(addressReturn);
        } catch (Exception e){
            return ResponseEntity.badRequest().body(new AddressException("Erro" + e.getMessage()));
        }
    }

    @Override
    public ResponseEntity<?> createAddress2(Address address) {
        Address addressReturn = repository.save(address);
        return ResponseEntity.ok().body(addressReturn);
    }
}
