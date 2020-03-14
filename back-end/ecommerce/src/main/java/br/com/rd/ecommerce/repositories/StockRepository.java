package br.com.rd.ecommerce.repositories;


import br.com.rd.ecommerce.models.entities.Stock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StockRepository extends JpaRepository<Stock, Long> {


}
