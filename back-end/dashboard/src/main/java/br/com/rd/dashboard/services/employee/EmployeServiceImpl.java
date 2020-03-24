package br.com.rd.dashboard.services.employee;

import br.com.rd.dashboard.converter.Converter;
import br.com.rd.dashboard.models.dto.EmployeeDTO;
import br.com.rd.dashboard.models.entities.Employee;
import br.com.rd.dashboard.models.entities.Hierarchy;
import br.com.rd.dashboard.repositories.EmployeeRepository;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


@Service
public class EmployeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeRepository repository;

    private Converter converter = new Converter();
    @Override
    public ResponseEntity<?> registerEmployee(EmployeeDTO emp) {
        if(emp == null)
            return ResponseEntity.badRequest().body(new EmployeeException("O funcionario não pode estar vazio"));
        if(emp.getEmail() != null)
            if(emp.getEmail().length() <= 10)
                return ResponseEntity.badRequest().body(new EmployeeException("O email do usuario esta muito curto"));
        if(emp.getName() == null || emp.getName().length() <= 10)
            return ResponseEntity.badRequest().body(new EmployeeException("O nome do usuario esta muito curto"));
        if(emp.getPassword() == null || emp.getPassword().length() <= 6)
            return ResponseEntity.badRequest().body(new EmployeeException("A senha do usuario esta muito curta"));
        if(emp.getHierarchy() == null || emp.getHierarchy() <= 0)
            return ResponseEntity.badRequest().body(new EmployeeException("A hierarquia do funcionario é invalida"));
        try{
            Employee employee = converter.convertTo(emp);
            String pass = employee.getPassword();
            String salt = BCrypt.gensalt();
            String passHash = BCrypt.hashpw(pass, salt);
            employee.setPassword(passHash);
            EmployeeDTO returnEmployee = converter.convertTo(repository.save(employee));
            return ResponseEntity.ok().body(returnEmployee);
        } catch (Exception e){
            return ResponseEntity.badRequest().body(new EmployeeException("Erro " + e.getMessage()));
        }
    }


    @Override
    public ResponseEntity<?> updateEmployee(EmployeeDTO emp) {
        if(emp == null)
            return ResponseEntity.badRequest().body(new EmployeeException("O funcionario não pode estar vazio"));
        if(emp.getEmail() != null)
            if(emp.getEmail().length() <= 10)
                return ResponseEntity.badRequest().body(new EmployeeException("O email do usuario esta muito curto"));
        if(emp.getName() == null || emp.getName().length() <= 10)
            return ResponseEntity.badRequest().body(new EmployeeException("O nome do usuario esta muito curto"));
        if(emp.getPassword() == null || emp.getPassword().length() <= 6)
            return ResponseEntity.badRequest().body(new EmployeeException("A senha do usuario esta muito curta"));
        if(emp.getHierarchy() == null || emp.getHierarchy() <= 0)
            return ResponseEntity.badRequest().body(new EmployeeException("A hierarquia do funcionario é invalida"));
        try{
            Employee employee = repository.findById(emp.getId()).get();
            employee.setUsername(emp.getUsername());
            employee.setName(emp.getName());
            employee.setEmail(emp.getEmail());
            employee.setId(emp.getId());
            employee.setHierarchy(new Hierarchy(emp.getHierarchy(), null));
            String pass = emp.getPassword();
            String salt = BCrypt.gensalt();
            String passHash = BCrypt.hashpw(pass, salt);
            employee.setPassword(passHash);
            EmployeeDTO returnEmp = converter.convertTo(repository.save(employee));
            return ResponseEntity.ok().body(returnEmp);
        } catch(Exception e){
            return ResponseEntity.badRequest().body(new EmployeeException("Erro " + e.getMessage()));
        }
    }

    @Override
    public ResponseEntity<?> deleteEmployee(Long id) {
        if(id <= 0)
            return ResponseEntity.badRequest().body(new EmployeeException("Id do usuario é invalido"));
        try {
            repository.deleteById(id);
            return ResponseEntity.ok().build();
        } catch (Exception e){
            return ResponseEntity.badRequest().body(new EmployeeException("Erro ") + e.getMessage());
        }
    }

    @Override
    public ResponseEntity<?> login(EmployeeDTO emp) {
        if(emp == null)
            return ResponseEntity.badRequest().body(new EmployeeException("O usuario não pode estar vazio"));
        if(emp.getUsername() == null || emp.getUsername().length() <= 0)
            return ResponseEntity.badRequest().body(new EmployeeException("O nome de usuario esta vazio"));
        if(emp.getPassword() == null || emp.getPassword().length() <= 0)
            return ResponseEntity.badRequest().body(new EmployeeException("A senha esta vazia"));
        try{
            Employee employee = repository.findByUsername(emp.getUsername());
            if(employee == null)
                return ResponseEntity.badRequest().body(new EmployeeException("Nenhum usuario encontrado"));
            if(BCrypt.checkpw(emp.getPassword(), employee.getPassword())){
                EmployeeDTO returnEntity = converter.convertTo(employee);
                return ResponseEntity.ok().body(returnEntity);
            } else
                return ResponseEntity.badRequest().body(new EmployeeException("Erro ao fazer o login"));

        } catch(Exception e){
            return ResponseEntity.badRequest().body(new EmployeeException("Erro" + e.getMessage()));
        }
    }

    @Override
    public ResponseEntity<?> findUser(String username) {
        if(username.equals(""))
            return ResponseEntity.notFound().build();
        try {
            Employee employee = repository.findByUsername(username);
            if(employee == null)
                return ResponseEntity.badRequest().body(new Exception("Erro"));
            EmployeeDTO returnDTO = converter.convertTo(employee);

            return ResponseEntity.ok().body(returnDTO);
        } catch (Exception e){
            return ResponseEntity.badRequest().body(new Exception("Erro " + e.getMessage()));
        }
    }
}
