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
    public Product save(@RequestBody Product product){
        return productRepository.save(product);
    }

    @GetMapping("/product/all")
    public List<Product> findAll(){
        return productRepository.findAll();
    }

    @GetMapping("/productId/{id}")
    public ResponseEntity<Product> findById(@PathVariable("id") Long id){
        return ResponseEntity.ok().body(productRepository.findById(id).get());
    }

    @GetMapping("/productDescription/{descricao}")
    public List<Product> findByName(@PathVariable("descricao") String name){
        return productRepository.findByName(name);
    }

    @GetMapping("/product")
    public Product findProductById(@PathParam("id") Long id){
        return productRepository.findById(id).stream().findFirst().orElse(null);
    }

    @DeleteMapping("/product/{id}")
    public void deleteById(@PathVariable("id") Long id){
        productRepository.deleteById(id);
    }

    @PutMapping("/product")
    public Product updateAll(@RequestBody Product product){
        Product p = productRepository.findById(product.getId()).get();
        p.setCategory(product.getCategory());
        p.setDescription(product.getDescription());
        p.setImage(product.getImage());
        p.setName(product.getName());
        p.setPrice(product.getPrice());
        return productRepository.save(p);
    }

}
