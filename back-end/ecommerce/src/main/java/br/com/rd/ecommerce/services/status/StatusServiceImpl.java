package br.com.rd.ecommerce.services.status;

import br.com.rd.ecommerce.converters.Converter;
import br.com.rd.ecommerce.models.dto.StatusDTO;
import br.com.rd.ecommerce.models.entities.Status;
import br.com.rd.ecommerce.repositories.StatusRepository;
import br.com.rd.ecommerce.services.exceptions.StatusException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class StatusServiceImpl  implements  StatusService{
    @Autowired
    private StatusRepository statusRepository;
    private Converter converter = new Converter();

    @Override
    public ResponseEntity<?> createStatus(StatusDTO status) {
        if(status == null)
            return ResponseEntity.badRequest().body(new StatusException("Favor informe um status"));
        Status stat = converter.convertTo(status);
        try{
            StatusDTO returnStatus = converter.convertTo(statusRepository.save(stat));
            return ResponseEntity.ok().body(returnStatus);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(new StatusException("Erro") + e.getMessage());
        }
    }

    @Override
    public ResponseEntity<?> findStatusById(Long id) {
        if(id <= 0)
            return ResponseEntity.badRequest().body(new StatusException("Favor informe um id valido"));
        try{
            Status status = statusRepository.findByIdStatus(id);
            if(status == null)
                return ResponseEntity.notFound().build();
            StatusDTO statusDTO = converter.convertTo(status);
            return ResponseEntity.ok().body(statusDTO);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(new StatusException("Erro") + e.getMessage());
        }
    }

    @Override
    public ResponseEntity<?> findStatusByDesc(String status) {
        if(status == null || status == "")
            return ResponseEntity.badRequest().body(new StatusException("Favor informe um status"));
        try{
            List<Status> s = statusRepository.findByStatus(status);
            if(s == null || s.size() <= 0)
                return ResponseEntity.notFound().build();
            List<StatusDTO> sDTO = new ArrayList<>();
            for(Status st: s)
                sDTO.add(converter.convertTo(st));

            return ResponseEntity.ok().body(sDTO);
        }catch(Exception e){
            return ResponseEntity.badRequest().body(new StatusException("Erro") + e.getMessage());
        }
    }

    @Override
    public void deleteStatus(Long id) {
        statusRepository.deleteById(id);
    }

    @Override
    public ResponseEntity<?> updateStatus(StatusDTO status) {
        if(status == null)
            return ResponseEntity.badRequest().body(new StatusException("Informe um status"));
        try {
            Status s = statusRepository.findByIdStatus(status.getId());
            s.setStatus(status.getName());
            s.setIdStatus(status.getId());
            StatusDTO returnStatus = converter.convertTo(statusRepository.save(s));
            return ResponseEntity.ok().body(returnStatus);
        } catch (Exception e){
            return ResponseEntity.badRequest().body(new StatusException("Erro") + e.getMessage());
        }

    }
}
