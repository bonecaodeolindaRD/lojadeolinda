package br.com.rd.ecommerce.services.category;

import br.com.rd.ecommerce.models.entities.Category;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface CategoryService {
    ResponseEntity<?> findCategoryById(Long id);
    ResponseEntity<?> findAllCategories();
}
