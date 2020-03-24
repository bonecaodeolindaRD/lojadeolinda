package br.com.rd.ecommerce.services.category;


import br.com.rd.ecommerce.converters.Converter;
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
public class CategoryServiceImpl implements CategoryService {
    @Autowired
    private CategoryRepository repository;
    private Converter converter = new Converter();

    @Override
    public ResponseEntity<?> createCategory(Category category) {
        if (category == null)
            return ResponseEntity.badRequest().body(new CategoryException("Erro ao criar a categoria"));
        try {
            Category cat = repository.save(category);
            return ResponseEntity.ok().body(converter.convertTo(cat));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new CategoryException("Erro") + e.getMessage());
        }
    }

    @Override
    public ResponseEntity<?> findCategoryById(Long id) {
        try {
            Category category = repository.findById(id).get();
            if (category == null)
                return ResponseEntity.badRequest().body(new CategoryException("Nenhum dado encontrado"));
            CategoryDTO catDTO = converter.convertTo(category);
            return ResponseEntity.ok().body(catDTO);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new CategoryException("Erro") + e.getMessage());
        }
    }

    @Override
    public ResponseEntity<?> findAllCategories() {
        try {
            List<Category> categories = repository.findAll();
            if (categories == null || categories.size() <= 0)
                return ResponseEntity.badRequest().body(new CategoryException("Nenhum dado encontrado"));
            List<CategoryDTO> catDTO = new ArrayList<>();
            for (Category cat : categories)
                catDTO.add(converter.convertTo(cat));

            return ResponseEntity.ok().body(catDTO);
        } catch (Exception e){
            return ResponseEntity.badRequest().body(new CategoryException("Erro") + e.getMessage());
        }
    }

    @Override
    public ResponseEntity<?> findByCategoryByName(String name) {
        if (name == null || name == "")
            return ResponseEntity.badRequest().body(new CategoryException("Informe uma descricao"));
        try {
            List<Category> categories = repository.findByName(name);
            if (categories == null || categories.size() <= 0)
                return ResponseEntity.badRequest().body(new CategoryException("Nenhum dado encontrado"));
            List<CategoryDTO> catDTO = new ArrayList<>();
            for (Category cat : categories)
                catDTO.add(converter.convertTo(cat));

            return ResponseEntity.ok().body(catDTO);
        } catch (Exception e){
            return ResponseEntity.badRequest().body(new CategoryException("Erro") + e.getMessage());
        }
    }

    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    @Override
    public ResponseEntity<?> update(Category category) {
        if (category == null)
            return ResponseEntity.badRequest().body(new CategoryException("Erro ao atualizar a categoria"));
        try {
            Category cat = repository.findById(category.getId()).get();
            cat.setName(category.getName());
            cat = repository.save(cat);
            CategoryDTO catDTO = converter.convertTo(cat);
            return ResponseEntity.ok().body(catDTO);
        } catch (Exception e){
            return ResponseEntity.badRequest().body(new CategoryException("Erro") + e.getMessage());
        }
    }
}
