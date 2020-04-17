package br.com.rd.dashboard.controllers;


import br.com.rd.dashboard.models.entities.Category;
import br.com.rd.dashboard.services.category.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;


@RestController
public class CategoryController {

    @Autowired
    private CategoryService service;

    @GetMapping("/category")
    public ResponseEntity<?> findAllCategory(){
        return service.findAllCategories();
    }

    @GetMapping("/category/{id}")
    public ResponseEntity<?> findCategoryById(@PathVariable("id") Long id){
        return service.findCategoryById(id);
    }

    @PostMapping("/category")
    public ResponseEntity<?> createCategory(@Valid @RequestBody Category category){
        return service.createCategory(category);
    }

    @PutMapping("/category/{id}")
    public ResponseEntity<?> editCategory(@PathVariable("id") Long id, @RequestBody Category category){
        return service.updateCategory(id, category);
    }

    @DeleteMapping("/category/delete/{id}")
    public void deleteCategory(@PathVariable("id") Long id){
        service.deleteById(id);
    }

}
