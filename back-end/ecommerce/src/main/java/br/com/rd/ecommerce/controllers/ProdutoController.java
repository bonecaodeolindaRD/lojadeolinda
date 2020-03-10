package br.com.rd.ecommerce.controllers;

import br.com.rd.ecommerce.models.entities.Categoria;
import br.com.rd.ecommerce.repositories.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;

public class ProdutoController {

    @Autowired
    private CategoriaRepository repository;

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/categoria")
    public Categoria save (RequestBody Categoria ){
        return repository.save();
    }

}
