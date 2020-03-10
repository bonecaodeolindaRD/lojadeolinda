package br.com.rd.ecommerce.repositories;

import br.com.rd.ecommerce.models.entities.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Long> {

    List<Categoria> findByName(String name);
    List<Categoria> findById(Integer id);

    Categoria save();
}




