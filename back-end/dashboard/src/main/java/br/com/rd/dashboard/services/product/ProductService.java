package br.com.rd.dashboard.services.product;

import br.com.rd.dashboard.models.dto.ProductDTO;
import br.com.rd.dashboard.models.entities.Category;
import br.com.rd.dashboard.models.entities.Product;
import org.springframework.http.ResponseEntity;

public interface ProductService {
    ResponseEntity<?> findAllProducts();
    ResponseEntity<?> findProductById(Long id);
    ResponseEntity<?> findProductByName(String name);
    ResponseEntity<?> findAllPages(Integer page, Integer itemsPerPage);
    ResponseEntity<?> totalPages(Integer quantityPerPage);
    ResponseEntity<?> findProductByCategory(Long category);
    ResponseEntity<?> createProduct(ProductDTO productDTO);
    ResponseEntity<?> updateProduct(Long id, ProductDTO productDTO);
    ResponseEntity<?> findProductByDescription(String description);
    ResponseEntity<?> findProductByNameOrDescription(String str);
    ResponseEntity<?> findProductHome();
    void deleteProduct(Long id);
}
