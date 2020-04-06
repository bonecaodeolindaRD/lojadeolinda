package br.com.rd.ecommerce.controllers;

import br.com.rd.ecommerce.models.dto.ProductDTO;
import br.com.rd.ecommerce.models.entities.Product;
import br.com.rd.ecommerce.repositories.ProductRepository;
import br.com.rd.ecommerce.services.product.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;

@RestController
public class ProductController {

    @Autowired
    private ProductService service;

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

    @GetMapping("/product/order/name")
    public ResponseEntity<?> orderByName(@PathParam("desc") Integer desc, @PathParam("qtd") Integer qtd,
                                         @PathParam("page") Integer page){
        return service.orderByName(desc, qtd, page);
    }

    @GetMapping("/product/find/{str}")
    public ResponseEntity<?> findProduct(@PathVariable("str") String str){
        return service.findProductByNameOrDescription(str);
    }

}
