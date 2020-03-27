package br.com.rd.dashboard.services.stock;

import br.com.rd.dashboard.models.dto.ProductDTO;
import br.com.rd.dashboard.models.entities.OrderItem;
import br.com.rd.dashboard.services.exceptions.StockException;
import org.springframework.http.ResponseEntity;

public interface StockService {
    ResponseEntity<?> findItemOnStock(Long stock, Long product);
    ResponseEntity<?> findAllStocks();
    ResponseEntity<?> findItemInAllStocks(Long product);
    ResponseEntity<?> addItemOnStock(Long idStock, Long idproduct, Integer quantity);
    ResponseEntity<?> registerProductOnStock(Long stock, ProductDTO productDTO);
    ResponseEntity<?> getNotRegisteredItems();
}
