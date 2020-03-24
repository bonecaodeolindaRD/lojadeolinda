package br.com.rd.dashboard.controllers;


import br.com.rd.dashboard.models.dto.EmployeeDTO;
import br.com.rd.dashboard.services.employee.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class EmployeeController {

    @Autowired
    private EmployeeService service;

    @PostMapping("/employee/new")
    public ResponseEntity registerEmployee(@RequestBody EmployeeDTO employeeDTO){
        return service.registerEmployee(employeeDTO);
    }

    @PutMapping("/employee/update")
    public ResponseEntity updateEmployee(@RequestBody EmployeeDTO employeeDTO){
        return service.updateEmployee(employeeDTO);
    }

    @PostMapping("/employee/login")
    public ResponseEntity login(@RequestBody EmployeeDTO employeeDTO){
        return service.login(employeeDTO);
    }

}
