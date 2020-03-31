package br.com.rd.dashboard.controllers;


import br.com.rd.dashboard.models.dto.HierarchyDTO;
import br.com.rd.dashboard.services.hierarchy.HierarchyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
public class HierarchyController {
    @Autowired
    private HierarchyService service;

    @PostMapping("/hierarchy")
    public ResponseEntity createHierarchy(@Valid @RequestBody HierarchyDTO hierarchyDTO){
        return service.createHierarchy(hierarchyDTO);
    }

    @PutMapping("/hierarchy")
    public ResponseEntity updateHierarchy(@Valid @RequestBody HierarchyDTO hierarchyDTO){
        return service.updateHierarchy(hierarchyDTO);
    }
}
