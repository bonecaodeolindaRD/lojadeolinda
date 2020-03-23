package br.com.rd.dashboard.converter;

import br.com.rd.dashboard.models.dto.EmployeeDTO;
import br.com.rd.dashboard.models.dto.HierarchyDTO;
import br.com.rd.dashboard.models.entities.Employee;
import br.com.rd.dashboard.models.entities.Hierarchy;

public class Converter {

    public Employee convertTo(EmployeeDTO employeeDTO){
        Employee emp = new Employee();
        emp.setId(employeeDTO.getId());
        if(employeeDTO.getEmail() != null)
            emp.setEmail(employeeDTO.getEmail());
        emp.setHierarchy(new Hierarchy(employeeDTO.getHierarchy(), null));
        emp.setName(employeeDTO.getName());
        emp.setPassword(employeeDTO.getPassword());
        emp.setUsername(employeeDTO.getUsername());
        return emp;
    }

    public EmployeeDTO convertTo(Employee employee){
        EmployeeDTO emp = new EmployeeDTO();
        emp.setId(employee.getId());
        if(employee.getEmail() != null)
            emp.setEmail(employee.getEmail());
        emp.setHierarchy(employee.getHierarchy().getId());
        emp.setName(employee.getName());
        emp.setUsername(employee.getUsername());
        return emp;
    }

    public Hierarchy convertTo(HierarchyDTO hierarchyDTO){
        Hierarchy hierarchy = new Hierarchy();
        hierarchy.setId(hierarchyDTO.getId());
        hierarchy.setName(hierarchyDTO.getName());
        return hierarchy;
    }

    public HierarchyDTO convertTo(Hierarchy hierarchy){
        HierarchyDTO hierarchyDTO = new HierarchyDTO();
        hierarchyDTO.setId(hierarchy.getId());
        hierarchyDTO.setName(hierarchy.getName());
        return hierarchyDTO;
    }

}
