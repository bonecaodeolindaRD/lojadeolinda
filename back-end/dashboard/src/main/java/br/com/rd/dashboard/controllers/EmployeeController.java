package br.com.rd.dashboard.controllers;


import br.com.rd.dashboard.models.dto.EmployeeDTO;
import br.com.rd.dashboard.services.employee.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
public class EmployeeController {

    @Autowired
    private EmployeeService service;

    @PostMapping("/employee")
    public ResponseEntity<?> registerEmployee(@Valid @RequestBody EmployeeDTO employeeDTO){
        return service.registerEmployee(employeeDTO);
    }

    @PutMapping("/employee")
    public ResponseEntity<?> updateEmployee(@Valid @RequestBody EmployeeDTO employeeDTO){
        return service.updateEmployee(employeeDTO);
    }


    @PostMapping("/employee/login")
    public ResponseEntity<?> login(@RequestBody EmployeeDTO employeeDTO){
        return service.login(employeeDTO);
    }

    @GetMapping("/employee/{username}")
    public ResponseEntity<?> findEmployee(@PathVariable("username") String username){
        return service.findUser(username);
    }

}
