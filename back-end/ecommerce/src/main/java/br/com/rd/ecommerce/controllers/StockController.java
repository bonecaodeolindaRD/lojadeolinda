package br.com.rd.ecommerce.controllers;

import br.com.rd.ecommerce.models.dto.ProductDTO;
import br.com.rd.ecommerce.services.stock.StockServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class StockController {

    @Autowired
    private StockServiceImpl service;

    @GetMapping("/stock/product/{idproduct}/{idstock}")
    public ResponseEntity findProductOnStock(@PathVariable("idproduct") Long product, @PathVariable("idstock") Long stock){
        return service.findItemOnStock(stock, product);
    }

    @GetMapping("/stock/product/all/{id}")
    public ResponseEntity findProductInAllStock(@PathVariable("id") Long id){
        return service.findItemInAllStocks(id);
    }

    @GetMapping("/stock/notregistered")
    public ResponseEntity findNotRegistered(){
        return service.getNotRegisteredItems();
    }

    @PutMapping("/stock/product/edit/{idstock}/{idProduct}/{quantity}")
    public ResponseEntity editProsuct(@PathVariable("idstock") Long idStock, @PathVariable("idProduct") Long idProduct, @PathVariable("quantity") Integer quantity){
        return service.addItemOnStock(idStock, idProduct, quantity);
    }

    @PostMapping("/stock/product/new/{idstock}")
    public ResponseEntity registerProduct(@PathVariable("idstock") Long idStock, @RequestBody ProductDTO productDTO){
        return service.registerProductOnStock(idStock, productDTO);
    }
}
