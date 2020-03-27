package br.com.rd.dashboard.repositories;

import br.com.rd.dashboard.models.entities.InvoiceType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvoiceTypeRepository extends JpaRepository<InvoiceType, Long> {
}
