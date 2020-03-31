package br.com.rd.ecommerce.controllers;

import br.com.rd.ecommerce.models.dto.AddressDTO;
import br.com.rd.ecommerce.services.address.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;


@RestController
public class AddressController {

    @Autowired
    private AddressService service;

    @PostMapping("/address")
    public ResponseEntity<?> save(@Valid  @RequestBody AddressDTO address){
        return service.createAddress(address);
    }

    @GetMapping("/address")
    public ResponseEntity<?> findAll(){
        return service.findAllAddress();
    }

    @DeleteMapping("/address/{id}")
    public void deleteById(@PathVariable("id")Long id){
        service.deleteAddress(id);
    }

    @PutMapping("/address/{id}")
    public ResponseEntity<?> edit(@PathVariable("id") Long id, @Valid @RequestBody AddressDTO address){
        return service.updateAddress(id, address);
    }
}
