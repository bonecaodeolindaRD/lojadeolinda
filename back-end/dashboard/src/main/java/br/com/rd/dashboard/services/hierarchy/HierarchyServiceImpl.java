package br.com.rd.dashboard.services.hierarchy;

import br.com.rd.dashboard.converter.Converter;
import br.com.rd.dashboard.models.dto.HierarchyDTO;
import br.com.rd.dashboard.models.entities.Hierarchy;
import br.com.rd.dashboard.repositories.HierarchyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


@Service
public class HierarchyServiceImpl implements HierarchyService{

    @Autowired
    private HierarchyRepository repository;
    private Converter converter =  new Converter();
    @Override
    public ResponseEntity<?> createHierarchy(HierarchyDTO hierarchyDTO) {
        if(hierarchyDTO == null)
            return ResponseEntity.badRequest().body(new HierarchyException("A hierarquia não pode estar vazia"));
        try{
            Hierarchy hierarchy = converter.convertTo(hierarchyDTO);
            HierarchyDTO returnHirarchy = converter.convertTo(repository.save(hierarchy));
            return ResponseEntity.ok().body(returnHirarchy);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(new HierarchyException("Erro" + e.getMessage()));
        }
    }

    @Override
    public ResponseEntity<?> updateHierarchy(HierarchyDTO hierarchyDTO) {
        if(hierarchyDTO == null)
            return ResponseEntity.badRequest().body(new HierarchyException("A hierarquia não pode estar vazia"));
        try{
            Hierarchy hierarchy = repository.findById(hierarchyDTO.getId()).get();
            if(hierarchy == null)
                return ResponseEntity.badRequest().body(new HierarchyException("Hierarquia não encontrada"));
            hierarchy.setName(hierarchyDTO.getName());
            hierarchy.setId(hierarchyDTO.getId());
            HierarchyDTO returnHirarchy = converter.convertTo(repository.save(hierarchy));
            return ResponseEntity.ok().body(returnHirarchy);
        } catch (Exception e){
            return ResponseEntity.badRequest().body(new HierarchyException("Erro" + e.getMessage()));
        }
    }
}
