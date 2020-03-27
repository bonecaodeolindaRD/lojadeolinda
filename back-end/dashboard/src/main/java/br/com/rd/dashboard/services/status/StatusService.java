package br.com.rd.dashboard.services.status;

import br.com.rd.dashboard.models.dto.StatusDTO;
import br.com.rd.dashboard.models.entities.Status;
import org.springframework.http.ResponseEntity;

public interface StatusService {
    ResponseEntity<?> createStatus(StatusDTO status);
    ResponseEntity<?> findStatusById(Long id);
    ResponseEntity<?> findAllStatus();
    void deleteStatus(Long id);
    ResponseEntity<?> updateStatus(Long id, StatusDTO status);
}
