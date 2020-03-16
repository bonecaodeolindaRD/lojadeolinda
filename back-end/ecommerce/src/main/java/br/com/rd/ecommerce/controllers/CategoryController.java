package br.com.rd.ecommerce.controllers;


import br.com.rd.ecommerce.models.entities.Category;
import br.com.rd.ecommerce.repositories.CategoryRepository;
import br.com.rd.ecommerce.services.category.CategoryServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;
import java.util.List;

@RestController
public class CategoryController {

    @Autowired
    private CategoryServiceImpl service;

    @GetMapping("/category/all")
    public ResponseEntity findAllCategory(){
        return service.findAllCategories();
    }

    @GetMapping("/category/id/{id}")
    public ResponseEntity findCategoryById(@PathVariable("id") Long id){
        return service.findCategoryById(id);
    }

    @GetMapping("/category/name/{name}")
    public ResponseEntity findByCategoryName(@PathVariable("name") String name){
        return service.findByCategoryByName(name);
    }

    @PostMapping("/category/new")
    public ResponseEntity createCategory(@RequestBody Category category){
        return service.createCategory(category);
    }

    @PutMapping("/category/edit")
    public ResponseEntity editCategory(@RequestBody Category category){
        return service.update(category);
    }

    @DeleteMapping("/category/delete/{id}")
    public void deleteCategory(@PathVariable("id") Long id){
        service.deleteById(id);
    }
}
