package br.com.rd.ecommerce.controllers;

import br.com.rd.ecommerce.models.entities.Product;
import br.com.rd.ecommerce.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;
import java.util.List;

@RestController
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @PostMapping("create-product")
    public Product save(@RequestBody Product product) {
        return productRepository.save(product);
    }

    @GetMapping("/product/all")
    public ResponseEntity<List<Product>> findAll() {
        List<Product> products = productRepository.findAll();
        if (products != null && products.size() > 0)
            return ResponseEntity.ok().body(products);
        return ResponseEntity.badRequest().build();
    }

    @GetMapping("/productId/{id}")
    public ResponseEntity<Product> findById(@PathVariable("id") Long id) {
        return ResponseEntity.ok().body(productRepository.findById(id).get());
    }

    @GetMapping("/productDescription/{descricao}")
    public ResponseEntity<List<Product>> findByName(@PathVariable("descricao") String name) {
        List<Product> products = productRepository.findByName(name);
        if (products != null && products.size() > 0)
            return ResponseEntity.ok().body(products);
        return ResponseEntity.badRequest().build();
    }

    @GetMapping("/product")
    public ResponseEntity<Product> findProductById(@PathParam("id") Long id) {
        return ResponseEntity.ok(productRepository.findById(id).get());
    }

    @DeleteMapping("/product/{id}")
    public void deleteById(@PathVariable("id") Long id) {
        productRepository.deleteById(id);
    }

    @PutMapping("/product")
    public ResponseEntity<Product> updateAll(@RequestBody Product product) {
        Product p = productRepository.findById(product.getId()).get();
        p.setCategory(product.getCategory());
        p.setDescription(product.getDescription());
        p.setImage(product.getImage());
        p.setName(product.getName());
        p.setPrice(product.getPrice());
        return ResponseEntity.ok().body(productRepository.save(p));
    }

}
