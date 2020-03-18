package br.com.rd.ecommerce.controllers;

import br.com.rd.ecommerce.services.stock.StockServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

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
}
