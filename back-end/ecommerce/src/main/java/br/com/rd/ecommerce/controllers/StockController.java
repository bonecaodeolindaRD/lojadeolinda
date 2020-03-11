package br.com.rd.ecommerce.controllers;

import br.com.rd.ecommerce.models.entities.Stock;
import br.com.rd.ecommerce.repositories.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StockController {

    @Autowired
    private StockRepository stockRepository;

    @PostMapping("/create-stock")
    public Stock save(@RequestBody Stock stock){
        return  stockRepository.save(stock);
    }
}
