package br.com.rd.ecommerce.services.stock;

import br.com.rd.ecommerce.models.dto.ProductDTO;
import br.com.rd.ecommerce.models.entities.OrderItem;
import br.com.rd.ecommerce.services.exceptions.StockException;
import org.springframework.http.ResponseEntity;

public interface StockService {
    ResponseEntity<?> findItemOnStock(Long stock, Long product);
    ResponseEntity<?> updateItemOnStockByOrder(Long stock, OrderItem productDTO) throws StockException;
}
