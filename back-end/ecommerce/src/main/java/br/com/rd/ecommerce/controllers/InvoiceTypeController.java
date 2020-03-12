package br.com.rd.ecommerce.controllers;

import br.com.rd.ecommerce.models.entities.InvoiceType;
import br.com.rd.ecommerce.repositories.InvoiceTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;
import java.util.List;

@RestController
public class InvoiceTypeController {

    @Autowired
    private InvoiceTypeRepository invoiceTypeRepository;

    @PostMapping("create-invoice-type")
    public InvoiceType save(@RequestBody InvoiceType invoiceType) {return invoiceTypeRepository.save(invoiceType);}

    @GetMapping("/invoice-type/{id}")
    public InvoiceType findById(@PathVariable("id") Long id) {
        return invoiceTypeRepository.findById(id).get();
    }

    @GetMapping("/invoice-type")
    public InvoiceType findInvoiceTypeById(@PathParam("id") Long id) { return invoiceTypeRepository.findById(id).get();}

    @GetMapping("/invoice-type/all")
    public List<InvoiceType> findAll() {
        return invoiceTypeRepository.findAll();
    }

    @DeleteMapping("/invoice-type/{id}")
    public void deleteById(@PathVariable("id") Long id) {
        invoiceTypeRepository.deleteById(id);
    }

    @PutMapping("/invoice-type")
    public InvoiceType update(@RequestBody InvoiceType invoiceType) {
        InvoiceType invoiceTypeEntity = invoiceTypeRepository.findById(invoiceType.getId()).get();
        invoiceTypeEntity.setName(invoiceType.getName());
        return invoiceTypeRepository.save(invoiceTypeEntity);
    }

}
