package br.com.rd.ecommerce.controllers;

import br.com.rd.ecommerce.models.dto.AddressDTO;
import br.com.rd.ecommerce.models.entities.Address;
import br.com.rd.ecommerce.services.address.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AddressController {

    @Autowired
    private AddressService service;

    @PostMapping("/address/new")
    public ResponseEntity<?> save(@RequestBody Address address){
        return service.createAddress2(address);
    }
  
    @PostMapping("/address/client/new")
    public ResponseEntity<?> saveClientAddress(@RequestBody AddressDTO address){
        return service.createClientAddress(address);
    }

    @GetMapping("/address/all")
    public ResponseEntity<?> findAll(){
        return service.findAllAddress();
    }

    @GetMapping("/address/id/{id}")
    public ResponseEntity<?> findById(@PathVariable("id")Long id){
        return service.findAddressById(id);
    }

    @GetMapping("/address/cep/{cep}")
    public ResponseEntity<?> findByCEP(@PathVariable("cep") String cep){
        return service.findAddressByCEP(cep);
    }

    @DeleteMapping("/address/delete/{id}")
    public void deleteById(@PathVariable("id")Long id){
        service.deleteAddress(id);
    }

    @PutMapping("/address/update")
    public ResponseEntity<?> edit(@RequestBody AddressDTO address){
        return service.updateAddress(address);
    }
}
