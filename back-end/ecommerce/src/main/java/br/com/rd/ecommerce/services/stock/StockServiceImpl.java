package br.com.rd.ecommerce.services.stock;

import br.com.rd.ecommerce.converters.Converter;
import br.com.rd.ecommerce.models.dto.ProductDTO;
import br.com.rd.ecommerce.models.dto.StockDTO;
import br.com.rd.ecommerce.models.dto.StockProductDTO;
import br.com.rd.ecommerce.models.entities.OrderItem;
import br.com.rd.ecommerce.models.entities.Stock;
import br.com.rd.ecommerce.models.entities.StockProduct;
import br.com.rd.ecommerce.repositories.StockRepository;
import br.com.rd.ecommerce.services.exceptions.StockException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceException;
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
    public ResponseEntity addItemOnStock(Long idStock, Long idproduct, Integer quantity) {
        try{
            Stock stock = repository.findById(idStock).get();
            StockProduct sp = stock.getStockProducts().stream().filter(x -> x.getProduct().getId().equals(idproduct)).findFirst().orElse(null);
            sp.setBalance(sp.getBalance() + quantity);
            StockDTO returnStock = converter.convertTo(repository.save(stock));
            return ResponseEntity.ok().body(returnStock);
        } catch(Exception e){
            return ResponseEntity.badRequest().body("Erro " + e.getMessage());
        }
    }

    @Override
    public ResponseEntity updateItemOnStockByOrder(Long stock, OrderItem productDTO) throws StockException{
        try{
            Stock s = repository.findById(stock).get();
            StockProduct sp = s.getStockProducts().stream().filter(x -> x.getProduct().getId().equals(productDTO.getProduct().getId())).findFirst().orElse(null);
            if(sp.getBalance() < productDTO.getQuantity())
                throw new StockException("Quantidade solicitada maior que a quantidade no estoque");
            sp.setBalance(sp.getBalance() - productDTO.getQuantity());
            StockDTO returnStock = converter.convertTo(repository.save(s));
            return ResponseEntity.ok().body(returnStock);
        }catch (PersistenceException e){
            return ResponseEntity.badRequest().body(new StockException("Erro " + e.getMessage()));
        }
    }

    @Override
    public ResponseEntity registerProductOnStock(Long stock, ProductDTO productDTO) {
        try{
            Stock s = repository.findById(stock).get();
            StockProduct sp = new StockProduct();
            sp.setProduct(converter.convertTo(productDTO));
            sp.setBalance(0);
            s.addProduct(sp);
            StockDTO stockDTO = converter.convertTo(repository.save(s));
            return ResponseEntity.ok().body(stockDTO);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(new StockException("Erro " + e.getMessage()));
        }
    }


}
