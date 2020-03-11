package br.com.rd.ecommerce.controllers;

import br.com.rd.ecommerce.models.entities.Product;
import br.com.rd.ecommerce.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @PostMapping("create-product")
    public Product save(@RequestBody Product product){
        return productRepository.save(product);
    }
}
