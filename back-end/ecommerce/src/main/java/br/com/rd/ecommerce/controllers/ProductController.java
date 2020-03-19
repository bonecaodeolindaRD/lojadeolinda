package br.com.rd.ecommerce.controllers;

import br.com.rd.ecommerce.models.dto.ProductDTO;
import br.com.rd.ecommerce.models.entities.Product;
import br.com.rd.ecommerce.repositories.ProductRepository;
import br.com.rd.ecommerce.services.product.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class ProductController {

    @Autowired
    private ProductService service;

    @PostMapping("/product/new")
    public ResponseEntity save(@RequestBody ProductDTO product) {
        return service.createProduct(product);
    }

    @GetMapping("/product/all")
    public ResponseEntity findAll() {
       return service.findAllProducts();
    }

    @GetMapping("/product/id/{id}")
    public ResponseEntity findById(@PathVariable("id") Long id) {
        return service.findProductById(id);
    }

    @GetMapping("/product/name/{name}")
    public ResponseEntity findByName(@PathVariable("name") String name) {
        return service.findProductByName(name.toUpperCase());
    }

    @GetMapping("/product/category/{id}")
    public ResponseEntity findByCategory(@PathVariable("id") Long id){
        return service.findProductByCategory(id);
    }

    @GetMapping("/product/home")
    public ResponseEntity findProductHome(){
        return service.findProductHome();
    }

    @GetMapping("/product/description/{description}")
    public ResponseEntity findByDescription(@PathVariable("description") String description){
        return service.findProductByDescription(description);
    }

    @GetMapping("/product/find/{str}")
    public ResponseEntity findProduct(@PathVariable("str") String str){
        return service.findProductByNameOrDescription(str);
    }

    @DeleteMapping("/product/delete/{id}")
    public void deleteById(@PathVariable("id") Long id) {
       service.deleteProduct(id);
    }

    @PutMapping("/product/update")
    public ResponseEntity updateProduct(@RequestBody ProductDTO product) {
        return service.updateProduct(product);
    }

}
