package br.com.rd.dashboard.repositories;

import br.com.rd.dashboard.models.entities.Category;
import br.com.rd.dashboard.models.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

        Optional<List<Product>> findByCategory(Category category);

        Optional<List<Product>> findByName(@Param("name") String name);
}
