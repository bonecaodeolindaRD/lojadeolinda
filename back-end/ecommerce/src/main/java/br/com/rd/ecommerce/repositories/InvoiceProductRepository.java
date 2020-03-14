package br.com.rd.ecommerce.repositories;

import br.com.rd.ecommerce.models.entities.InvoiceProduct;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvoiceProductRepository extends JpaRepository<InvoiceProduct, Long> {
}
