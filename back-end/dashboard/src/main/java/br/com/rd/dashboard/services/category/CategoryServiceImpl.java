package br.com.rd.dashboard.services.category;


import br.com.rd.dashboard.converter.Converter;
import br.com.rd.dashboard.models.dto.CategoryDTO;
import br.com.rd.dashboard.models.entities.Category;
import br.com.rd.dashboard.repositories.CategoryRepository;
import br.com.rd.dashboard.services.exceptions.CategoryException;
import org.hibernate.JDBCException;
import org.hibernate.exception.SQLGrammarException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.server.ResponseStatusException;

import javax.persistence.EntityNotFoundException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {
    @Autowired
    private CategoryRepository repository;
    private Converter converter = new Converter();

    @Override
    public ResponseEntity<?> createCategory(Category category) {

        if (category == null)
            return ResponseEntity.badRequest().body(new CategoryException("Category is not be null"));
        Category cat = repository.save(category);
        return ResponseEntity.status(201).body(converter.convertTo(cat));

    }

    @Override
    public ResponseEntity<?> findCategoryById(Long id) {

        Category category = repository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Category not found"));
        CategoryDTO catDTO = converter.convertTo(category);
        return ResponseEntity.ok().body(catDTO);

    }

    @Override
    public ResponseEntity<?> findAllCategories() {
        List<Category> categories = repository.findAll();
        if (categories.size() <= 0)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        List<CategoryDTO> catDTO = new ArrayList<>();
        for (Category cat : categories)
            catDTO.add(converter.convertTo(cat));

        return ResponseEntity.status(HttpStatus.OK).body(catDTO);
    }

    @Override
    public ResponseEntity<?> findByCategoryByName(String name) {

        List<Category> categories = repository.findByName(name).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Category not found"));

        List<CategoryDTO> catDTO = new ArrayList<>();
        for (Category cat : categories)
            catDTO.add(converter.convertTo(cat));

        return ResponseEntity.ok().body(catDTO);
    }

    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    @Override
    public ResponseEntity<?> updateCategory(Long id, Category category) {
        if (category == null)
            return ResponseEntity.badRequest().body(new CategoryException("Category is not be null"));

        Category cat = repository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Category not found"));
        cat.setName(category.getName());
        cat = repository.save(cat);
        CategoryDTO catDTO = converter.convertTo(cat);
        return ResponseEntity.ok().body(catDTO);
    }

}
