package br.com.rd.ecommerce.services.stock;

import br.com.rd.ecommerce.models.dto.ProductDTO;
import br.com.rd.ecommerce.models.entities.Stock;
import org.springframework.http.ResponseEntity;

public class StockServiceImpl implements StockService{
    @Override
    public ResponseEntity findItemOnStock(Stock stock, ProductDTO productDTO) {
        return null;
    }

    @Override
    public ResponseEntity findAllStocks() {
        return null;
    }

    @Override
    public ResponseEntity findItemInAllStocks(ProductDTO productDTO) {
        return null;
    }

    @Override
    public ResponseEntity addItemOnStock(Stock stock, ProductDTO productDTO) {
        return null;
    }

    @Override
    public ResponseEntity updateItemOnStock(Stock stock, ProductDTO productDTO) {
        return null;
    }
}
