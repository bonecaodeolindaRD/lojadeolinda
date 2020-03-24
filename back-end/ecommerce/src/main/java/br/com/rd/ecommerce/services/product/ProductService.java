package br.com.rd.ecommerce.services.product;

import br.com.rd.ecommerce.models.dto.ProductDTO;
import br.com.rd.ecommerce.models.entities.Category;
import br.com.rd.ecommerce.models.entities.Product;
import org.springframework.http.ResponseEntity;

public interface ProductService {
    ResponseEntity<?> findAllProducts();
    ResponseEntity<?> findProductById(Long id);
    ResponseEntity<?> findProductByName(String name);
    ResponseEntity<?> findProductByCategory(Long category);
    ResponseEntity<?> createProduct(ProductDTO productDTO);
    ResponseEntity<?> updateProduct(ProductDTO productDTO);
    ResponseEntity<?> findProductByDescription(String description);
    ResponseEntity<?> findProductByNameOrDescription(String str);
    ResponseEntity<?> findProductHome();
    void deleteProduct(Long id);
}
