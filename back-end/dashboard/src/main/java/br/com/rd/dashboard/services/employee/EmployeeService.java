package br.com.rd.dashboard.services.employee;

import br.com.rd.dashboard.models.dto.EmployeeDTO;
import org.springframework.http.ResponseEntity;

public interface EmployeeService {
    ResponseEntity<?> registerEmployee(EmployeeDTO emp);
    ResponseEntity<?> updateEmployee(EmployeeDTO emp);
    ResponseEntity<?> deleteEmployee(Long id);
    ResponseEntity<?> login(EmployeeDTO emp);
    ResponseEntity<?> findUser(String username);
}
