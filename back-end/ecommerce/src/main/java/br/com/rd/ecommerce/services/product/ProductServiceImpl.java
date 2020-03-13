package br.com.rd.ecommerce.services.product;

import br.com.rd.ecommerce.converters.Converter;
import br.com.rd.ecommerce.models.dto.ProductDTO;
import br.com.rd.ecommerce.models.entities.Product;
import br.com.rd.ecommerce.repositories.ProductRepository;
import br.com.rd.ecommerce.services.exceptions.ProductException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository repository;
    private Converter converter = new Converter();

    @Override
    public ResponseEntity findAllProducts() {
        List<Product> products = repository.findAll();
        if(products == null || products.size() <= 0)
            return ResponseEntity.badRequest().body(new ProductException("Nenhum produto encontrado"));
        List<ProductDTO> productsDTO = new ArrayList<>();
        for(Product p: products)
            productsDTO.add(converter.convertTo(p));

        return ResponseEntity.ok().body(products);
    }

    @Override
    public ResponseEntity findProductById(Long id) {
        Product product = repository.findById(id).get();
        return null;
    }

    @Override
    public ResponseEntity findProductByName(String name) {
        return null;
    }

    @Override
    public ResponseEntity findProductByCategory(Integer category) {
        return null;
    }

    @Override
    public ResponseEntity createProduct(Product product) {
        return null;
    }

    @Override
    public ResponseEntity updateProduct(Product product) {
        return null;
    }

    @Override
    public void deleteProduct(Long id) {

    }
}
