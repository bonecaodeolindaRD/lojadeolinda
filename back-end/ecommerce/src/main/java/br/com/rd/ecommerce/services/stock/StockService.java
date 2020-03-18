package br.com.rd.ecommerce.services.stock;

import br.com.rd.ecommerce.models.dto.ProductDTO;
import br.com.rd.ecommerce.models.entities.Stock;
import org.springframework.http.ResponseEntity;

public interface StockService {
    ResponseEntity findItemOnStock(Long stock, Long product);
    ResponseEntity findAllStocks();
    ResponseEntity findItemInAllStocks(Long product);
    ResponseEntity addItemOnStock(Stock stock, ProductDTO productDTO);
    ResponseEntity updateItemOnStock(Stock stock, ProductDTO productDTO);
}
