package br.com.rd.ecommerce.repositories;

import br.com.rd.ecommerce.models.entities.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvoiceRepository extends JpaRepository<Invoice, Long> {
}
