package br.com.rd.ecommerce.services.product;

import br.com.rd.ecommerce.models.dto.ProductDTO;
import br.com.rd.ecommerce.models.entities.Category;
import br.com.rd.ecommerce.models.entities.Product;
import org.springframework.http.ResponseEntity;

public interface ProductService {
    ResponseEntity<?> findProductById(Long id);
    ResponseEntity<?> findProductByName(String name);
    ResponseEntity<?> findProductByCategory(Long category);
    ResponseEntity<?> findProductByDescription(String description);
    ResponseEntity<?> findProductByNameOrDescription(String str);
    ResponseEntity<?> totalItems();
    ResponseEntity<?> orderByName(Integer desc, Integer itensPerPage, Integer page);
    ResponseEntity<?> orderByPrice(Integer desc, Integer itensPerPage, Integer page);
    ResponseEntity<?> findProductHome();
}
