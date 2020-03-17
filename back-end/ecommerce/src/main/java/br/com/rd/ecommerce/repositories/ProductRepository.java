package br.com.rd.ecommerce.repositories;

import br.com.rd.ecommerce.models.entities.Category;
import br.com.rd.ecommerce.models.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

        List<Product> findByCategory(Category category);
        List<Product> findByName(@Param("name") String name);
}
