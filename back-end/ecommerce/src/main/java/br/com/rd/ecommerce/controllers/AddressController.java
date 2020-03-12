package br.com.rd.ecommerce.controllers;

import br.com.rd.ecommerce.models.entities.Address;
import br.com.rd.ecommerce.repositories.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AddressController {
    @Autowired
    AddressRepository addressRepository;

    @PostMapping("/address")
    public Address save(@RequestBody Address address){
        return addressRepository.save(address);
    }

    @GetMapping("/address/list")
    public List<Address> find(){
        return addressRepository.findAll();
    }

    @GetMapping("/address/{id}")
    public Address findById(@PathVariable("id")Long id){
        return addressRepository.findById(id).get();
    }

    @DeleteMapping("/address")
    public void deleteById(@PathVariable("id")Long id){
        addressRepository.deleteById(id);
    }

    @PutMapping("/address")
    public Address edit(@RequestBody Address address){
        Address addressEntity = addressRepository.getOne(address.getId());
        addressEntity.setStreet(address.getStreet());
        addressEntity.setCEP(address.getCEP());
        addressEntity.setDistrict(address.getDistrict());
        addressEntity.setNumber(address.getNumber());
        addressEntity.setProvider(address.getProvider());
        addressEntity.setUF(address.getUF());

        return addressRepository.save(addressEntity);
    }
}
