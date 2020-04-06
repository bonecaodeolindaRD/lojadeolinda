package br.com.rd.ecommerce.controllers;

        import br.com.rd.ecommerce.models.dto.ProductDTO;
        import br.com.rd.ecommerce.services.stock.StockService;
        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.http.ResponseEntity;
        import org.springframework.web.bind.annotation.*;

@RestController
public class StockController {

    @Autowired
    private StockService service;

    @GetMapping("/stock/product/{idproduct}/{idstock}")
    public ResponseEntity<?> findProductOnStock(@PathVariable("idproduct") Long product, @PathVariable("idstock") Long stock){
        return service.findItemOnStock(stock, product);
    }
}
