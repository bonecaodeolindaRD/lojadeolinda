package br.com.rd.dashboard.services.category;

import br.com.rd.dashboard.models.entities.Category;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface CategoryService {
    ResponseEntity<?> createCategory(Category category);
    ResponseEntity<?> findCategoryById(Long id);
    ResponseEntity<?> findAllCategories();
    ResponseEntity<?> findByCategoryByName(String name);
    void deleteById(Long id);
    ResponseEntity<?>  updateCategory(Long id, Category category);
}
