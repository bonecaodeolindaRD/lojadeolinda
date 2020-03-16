package br.com.rd.ecommerce.controllers;

import br.com.rd.ecommerce.models.entities.Stock;
import br.com.rd.ecommerce.models.entities.User;
import br.com.rd.ecommerce.repositories.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class StockController {

    @Autowired
    private StockRepository stockRepository;

    @PostMapping("/create-stock")
    public Stock save(@RequestBody Stock stock){
        return  stockRepository.save(stock);
    }

    @GetMapping("/find-stock/list")
    public List<Stock> find(){
        return stockRepository.findAll();
    }

    @DeleteMapping("/stock/{id}")
    public void deleteById(@PathVariable("id") Long id) {
        stockRepository.deleteById(id);
    }
}
