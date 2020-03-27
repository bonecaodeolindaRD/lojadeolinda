package br.com.rd.dashboard.repositories;


import br.com.rd.dashboard.models.entities.Stock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StockRepository extends JpaRepository<Stock, Long> {


}
