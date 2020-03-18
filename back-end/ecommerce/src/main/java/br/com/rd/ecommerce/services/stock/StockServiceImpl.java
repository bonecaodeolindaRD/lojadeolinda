package br.com.rd.ecommerce.services.stock;

import br.com.rd.ecommerce.converters.Converter;
import br.com.rd.ecommerce.models.dto.ProductDTO;
import br.com.rd.ecommerce.models.dto.StockDTO;
import br.com.rd.ecommerce.models.dto.StockProductDTO;
import br.com.rd.ecommerce.models.entities.Product;
import br.com.rd.ecommerce.models.entities.Stock;
import br.com.rd.ecommerce.models.entities.StockProduct;
import br.com.rd.ecommerce.repositories.StockRepository;
import br.com.rd.ecommerce.services.exceptions.StockException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.ArrayList;
import java.util.List;

@Service
public class StockServiceImpl implements StockService{

    @Autowired
    private StockRepository repository;
    @PersistenceContext
    private EntityManager em;
    private Converter converter = new Converter();

    @Override
    public ResponseEntity findItemOnStock(Long stock, Long product) {
        Query query = em.createQuery("select p from StockProduct p inner join Stock s on s.id = p.stock where p.product = " + product + " and s.id = "
                + stock, StockProduct.class);
        try{
            List<StockProduct> stockProducts = query.getResultList();
            if(stockProducts == null || stockProducts.size() <= 0)
                return ResponseEntity.badRequest().body(new StockException("Nenhum produto encontrado"));
            StockProduct sp = stockProducts.stream().findFirst().orElse(null);
            StockProductDTO spDTO = converter.convertTo(sp);

            return ResponseEntity.ok().body(spDTO);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(new StockException("Erro " + e.getMessage()));
        }
    }

    @Override
    public ResponseEntity findAllStocks() {
        try {
            List<Stock> stocks = repository.findAll();
            if(stocks == null || stocks.size() <= 0)
                return ResponseEntity.badRequest().body(new StockException("Nenhum stock encontrado"));
            List<StockDTO> stocksDTO = new ArrayList<>();
            for(Stock s: stocks)
                stocksDTO.add(converter.convertTo(s));

            return ResponseEntity.ok().body(stocksDTO);
        } catch(Exception e){
            return ResponseEntity.badRequest().body(new StockException("Erro " + e.getMessage()));
        }
    }

    @Override
    public ResponseEntity findItemInAllStocks(Long product) {
        Query query = em.createQuery("select p from StockProduct p inner join Stock s on s.id = p.stock where p.product =" + product, StockProduct.class);
        try{
            List<StockProduct> stockProducts = query.getResultList();
            if(stockProducts == null || stockProducts.size() <= 0)
                return ResponseEntity.badRequest().body(new StockException("Nenhum produto encontrado"));

            List<StockProductDTO> spDTO = new ArrayList<>();
            for(StockProduct sp: stockProducts)
                spDTO.add(converter.convertTo(sp));

            return ResponseEntity.ok().body(spDTO);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(new StockException("Erro " + e.getMessage()));
        }
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
