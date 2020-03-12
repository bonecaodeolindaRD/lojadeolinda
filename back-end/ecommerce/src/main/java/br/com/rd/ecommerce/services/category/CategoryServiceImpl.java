package br.com.rd.ecommerce.services.category;


import br.com.rd.ecommerce.models.dto.CategoryDTO;
import br.com.rd.ecommerce.models.entities.Category;
import br.com.rd.ecommerce.repositories.CategoryRepository;
import br.com.rd.ecommerce.services.exceptions.CategoryException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService{
    @Autowired
    private CategoryRepository repository;

    @Override
    public ResponseEntity createCategory(Category category) {
        if(category == null)
            return ResponseEntity.badRequest().body(new CategoryException("Erro ao criar a categoria"));
        Category cat = repository.save(category);
        CategoryDTO catDTO = new CategoryDTO();
        catDTO.setId(cat.getId());
        catDTO.setName(cat.getName());
        return ResponseEntity.ok().body(catDTO);
    }

    @Override
    public ResponseEntity findCategoryById(Long id) {
        Category category = repository.findById(id).get();
        if(category == null)
            return ResponseEntity.badRequest().body(new CategoryException("Nenhum dado encontrado"));
        CategoryDTO catDTO = new CategoryDTO();
        catDTO.setId(category.getId());
        catDTO.setName(category.getName());
        return ResponseEntity.ok().body(catDTO);
    }

    @Override
    public ResponseEntity findAll() {
        List<Category> categories = repository.findAll();
        if(categories == null || categories.size() <= 0)
            return ResponseEntity.badRequest().body(new CategoryException("Nenhum dado encontrado"));
        List<CategoryDTO> catDTO = new ArrayList<>();
        for(Category cat: categories){
            CategoryDTO c = new CategoryDTO();
            c.setName(cat.getName());
            c.setId(cat.getId());
            catDTO.add(c);
        }
        return ResponseEntity.ok().body(catDTO);
    }

    @Override
    public ResponseEntity findByCategoryByName(String name) {
        if(name == null || name == "")
            return ResponseEntity.badRequest().body(new CategoryException("Informe uma descricao"));
        List<Category> categories = repository.findByName(name);
        if(categories == null || categories.size() <= 0)
            return ResponseEntity.badRequest().body(new CategoryException("Nenhum dado encontrado"));
        List<CategoryDTO> catDTO = new ArrayList<>();
        for(Category cat: categories){
            CategoryDTO c = new CategoryDTO();
            c.setName(cat.getName());
            c.setId(cat.getId());
            catDTO.add(c);
        }
        return ResponseEntity.ok().body(catDTO);
    }

    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    @Override
    public ResponseEntity update(Category category) {
        if(category == null)
            return ResponseEntity.badRequest().body(new CategoryException("Erro ao atualizar a categoria"));
        Category cat = repository.findById(category.getId()).get();
        CategoryDTO catDTO = new CategoryDTO();
        cat.setName(category.getName());
        cat = repository.save(cat);
        catDTO.setId(cat.getId());
        catDTO.setName(cat.getName());
        return ResponseEntity.ok().body(catDTO);
    }
}
