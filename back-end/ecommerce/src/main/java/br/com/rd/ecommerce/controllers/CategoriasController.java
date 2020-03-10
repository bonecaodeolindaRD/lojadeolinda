package br.com.rd.ecommerce.controllers;

import br.com.rd.ecommerce.models.entities.Categoria;
import br.com.rd.ecommerce.repositories.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@Repository

public class CategoriasController {

    @Autowired
    private CategoriaRepository repository;

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/categoria")
    public Categoria save (RequestBody Categoria ){
        return repository.save();
    }

    //@GetMapping("/find-categoria/list")
    //public List<categoria> find() {return categoriaRepository.findAll();}
}
