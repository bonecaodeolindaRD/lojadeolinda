package br.com.rd.ecommerce.services.product;

import br.com.rd.ecommerce.models.entities.Category;
import br.com.rd.ecommerce.models.entities.Product;
import org.springframework.http.ResponseEntity;

public interface ProductService {
    ResponseEntity findAllProducts();
    ResponseEntity findProductById(Long id);
    ResponseEntity findProductByName(String name);
    ResponseEntity findProductByCategory(Integer category);
    ResponseEntity createProduct(Product product);
    ResponseEntity updateProduct(Product product);
    void deleteProduct(Long id);
}
