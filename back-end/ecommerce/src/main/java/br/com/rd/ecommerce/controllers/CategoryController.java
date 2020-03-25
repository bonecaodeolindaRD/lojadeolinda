package br.com.rd.ecommerce.controllers;


import br.com.rd.ecommerce.models.entities.Category;
import br.com.rd.ecommerce.services.category.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


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
    public ResponseEntity<?> createCategory(@RequestBody Category category){
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
