package br.com.rd.ecommerce.services.stock;

import br.com.rd.ecommerce.models.dto.ProductDTO;
import br.com.rd.ecommerce.models.entities.OrderItem;
import org.springframework.http.ResponseEntity;

public interface StockService {
    ResponseEntity findItemOnStock(Long stock, Long product);
    ResponseEntity findAllStocks();
    ResponseEntity findItemInAllStocks(Long product);
    ResponseEntity addItemOnStock(Long idStock, Long idproduct, Integer quantity);
    ResponseEntity updateItemOnStockByOrder(Long stock, OrderItem productDTO);
    ResponseEntity registerProductOnStock(Long stock, ProductDTO productDTO);
}
