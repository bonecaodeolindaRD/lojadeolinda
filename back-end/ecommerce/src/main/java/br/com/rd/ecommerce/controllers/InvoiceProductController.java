package br.com.rd.ecommerce.controllers;

import br.com.rd.ecommerce.models.entities.InvoiceProduct;
import br.com.rd.ecommerce.repositories.InvoiceProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class InvoiceProductController {

    @Autowired
    private InvoiceProductRepository invoiceProductRepository;

    @PostMapping("create-invoice-product")
    public InvoiceProduct save(@RequestBody InvoiceProduct invoiceProduct) {return invoiceProductRepository.save(invoiceProduct);}

    @GetMapping("/invoice-product/{id}")
    public InvoiceProduct findById(@PathVariable("id") Long id) {
        return invoiceProductRepository.findById(id).get();
    }

    @GetMapping("/invoice-product/all")
    public List<InvoiceProduct> findAll() {
        return invoiceProductRepository.findAll();
    }

    @DeleteMapping("/invoice-product/{id}")
    public void deleteById(@PathVariable("id") Long id) {
        invoiceProductRepository.deleteById(id);
    }

    @PutMapping("/invoice-product")
    public InvoiceProduct update(@RequestBody InvoiceProduct invoiceProduct) {
        InvoiceProduct invoiceProductEntity = invoiceProductRepository.findById(invoiceProduct.getId()).get();
        invoiceProductEntity.setInvoice(invoiceProduct.getInvoice());
        invoiceProductEntity.setProduct(invoiceProduct.getProduct());
        invoiceProductEntity.setQuantity(invoiceProduct.getQuantity());
        invoiceProductEntity.setValue(invoiceProduct.getValue());

        return invoiceProductRepository.save(invoiceProductEntity);
    }

}
