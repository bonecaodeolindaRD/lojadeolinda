package br.com.rd.ecommerce.services.status;

import br.com.rd.ecommerce.models.dto.StatusDTO;
import br.com.rd.ecommerce.models.entities.Status;
import org.springframework.http.ResponseEntity;

public interface StatusService {
    ResponseEntity<?> createStatus(StatusDTO status);
    ResponseEntity<?> findStatusById(Long id);
    ResponseEntity<?> findStatusByDesc(String status);
    void deleteStatus(Long id);
    ResponseEntity<?> updateStatus(Long id, StatusDTO status);
}
