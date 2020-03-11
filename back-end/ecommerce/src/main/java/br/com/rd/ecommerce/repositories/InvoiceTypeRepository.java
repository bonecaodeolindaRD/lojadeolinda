package br.com.rd.ecommerce.repositories;

import br.com.rd.ecommerce.models.entities.InvoiceType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvoiceTypeRepository extends JpaRepository<InvoiceType, Long> {
}
