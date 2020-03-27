package br.com.rd.dashboard.controllers;

import br.com.rd.dashboard.models.dto.ProductDTO;
import br.com.rd.dashboard.models.entities.Product;
import br.com.rd.dashboard.repositories.ProductRepository;
import br.com.rd.dashboard.services.product.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class ProductController {

    @Autowired
    private ProductService service;

    @PostMapping("/product")
    public ResponseEntity<?> save(@RequestBody ProductDTO product) {
        return service.createProduct(product);
    }

    @GetMapping("/product")
    public ResponseEntity<?> findAll() {
       return service.findAllProducts();
    }

    @GetMapping("/product/{id}")
    public ResponseEntity<?> findById(@PathVariable("id") Long id) {
        return service.findProductById(id);
    }


    @GetMapping("/product/category/{id}")
    public ResponseEntity<?> findByCategory(@PathVariable("id") Long id){
        return service.findProductByCategory(id);
    }

    @GetMapping("/product/home")
    public ResponseEntity<?> findProductHome(){
        return service.findProductHome();
    }


    @GetMapping("/product/find/{str}")
    public ResponseEntity<?> findProduct(@PathVariable("str") String str){
        return service.findProductByNameOrDescription(str);
    }

    @DeleteMapping("/product/{id}")
    public void deleteById(@PathVariable("id") Long id) {
       service.deleteProduct(id);
    }

    @PostMapping("/product/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable("id") Long id, @RequestBody ProductDTO product) {
        return service.updateProduct(id, product);
    }

}
