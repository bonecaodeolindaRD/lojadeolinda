package br.com.rd.ecommerce.controllers;

import br.com.rd.ecommerce.models.entities.Invoice;
import br.com.rd.ecommerce.repositories.InvoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class InvoiceController {
    @Autowired
    private InvoiceRepository invoiceRepository;

    @GetMapping("/invoice/{id}")
    public Invoice getInvoice(@PathVariable("id") Long id){
        return invoiceRepository.findById(id).get();
    }
}
