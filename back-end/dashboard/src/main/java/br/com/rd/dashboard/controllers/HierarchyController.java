package br.com.rd.dashboard.controllers;


import br.com.rd.dashboard.models.dto.HierarchyDTO;
import br.com.rd.dashboard.services.hierarchy.HierarchyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class HierarchyController {
    @Autowired
    private HierarchyService service;

    @PostMapping("/hierarchy/new")
    public ResponseEntity createHierarchy(@RequestBody HierarchyDTO hierarchyDTO){
        return service.createHierarchy(hierarchyDTO);
    }

    @PutMapping("/hierarchy/update")
    public ResponseEntity updateHierarchy(@RequestBody HierarchyDTO hierarchyDTO){
        return service.updateHierarchy(hierarchyDTO);
    }
}
