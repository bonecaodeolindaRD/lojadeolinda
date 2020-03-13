package br.com.rd.ecommerce.controllers;

import br.com.rd.ecommerce.models.entities.Provider;
import br.com.rd.ecommerce.repositories.ProviderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ProviderController {
    @Autowired
    ProviderRepository providerRepository;

    @PostMapping("/provider")
    public Provider save(@RequestBody Provider provider){
        return providerRepository.save(provider);
    }

    @DeleteMapping("/provider/{id}")
    public void deleteById(@PathVariable("id")Long id){
        providerRepository.deleteById(id);
    }

    @GetMapping("/provider/list")
    public List<Provider> find(){
        return providerRepository.findAll();
    }

    @GetMapping("/provider/{id}")
    public Provider findProviderById(@PathVariable("id")Long id){
        return providerRepository.findById(id).get();
    }

    @PutMapping("/provider")
    public Provider edit(@RequestBody Provider provider){
        Provider providerEntity = providerRepository.getOne(provider.getId());
        providerEntity.setName(provider.getName());
        providerEntity.setCNPJ(provider.getCNPJ());
        providerEntity.setAddresses(provider.getAddresses());

        return providerRepository.save(providerEntity);
    }
}
