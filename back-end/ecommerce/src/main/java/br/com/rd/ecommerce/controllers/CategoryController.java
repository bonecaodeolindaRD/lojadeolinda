package br.com.rd.ecommerce.controllers;


import br.com.rd.ecommerce.models.entities.Category;
import br.com.rd.ecommerce.repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;
import java.util.List;

@RestController
public class CategoryController {

    @Autowired
    private CategoryRepository categoryRepository;

    @PostMapping("/create-category")
    public Category save(@RequestBody Category category) {
        return categoryRepository.save(category);
    }

    @GetMapping("/category/{id}")
    public Category findById(@PathVariable("id") Long id) {
        return categoryRepository.findById(id).get();
    }

    @GetMapping("/category")
    public Category findCategoryById(@PathParam("id") Long id) {
        return categoryRepository.findById(id).get();
    }

    @GetMapping("/category/all")
    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

    @DeleteMapping("/category/{id}")
    public void deleteById(@PathVariable("id") Long id) {
        categoryRepository.deleteById(id);
    }

    @PutMapping("/category")
    public Category update(@RequestBody Category category) {
        Category categoryEntity = categoryRepository.findById(category.getId()).get();
        categoryEntity.setName(category.getName());
        return categoryRepository.save(categoryEntity);
    }
}
