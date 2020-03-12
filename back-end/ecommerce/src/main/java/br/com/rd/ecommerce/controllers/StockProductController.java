//package br.com.rd.ecommerce.controllers;
//
//
//import br.com.rd.ecommerce.models.entities.Stock;
//import br.com.rd.ecommerce.models.entities.StockProduct;
//import br.com.rd.ecommerce.repositories.StockProductRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//public class StockProductController {
//
//    @Autowired
//    private StockProductRepository stockProductRepository;
//
//    @PostMapping("/create-stockproduct")
//    public StockProduct save(@RequestBody StockProduct stockProduct){
//        return  stockProductRepository.save(stockProduct);
//    }
//
//    @GetMapping("/find-stockproduct/list")
//    public List<Stock> find(){
//        return stockProductRepository.findAll();
//    }
//
//    @DeleteMapping("/stockproduct/{id}")
//    public void deleteById(@PathVariable("id") Long id) {
//        stockProductRepository.deleteById(id);
//    }
//}
