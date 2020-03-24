package br.com.rd.dashboard.repositories;

import br.com.rd.dashboard.models.entities.Hierarchy;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HierarchyRepository extends JpaRepository<Hierarchy, Long> {
}
