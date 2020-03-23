package br.com.rd.dashboard.services.hierarchy;

import br.com.rd.dashboard.models.dto.HierarchyDTO;
import org.springframework.http.ResponseEntity;

public interface HierarchyService {
    ResponseEntity createHierarchy(HierarchyDTO hierarchyDTO);
    ResponseEntity updateHierarchy(HierarchyDTO hierarchyDTO);
}
