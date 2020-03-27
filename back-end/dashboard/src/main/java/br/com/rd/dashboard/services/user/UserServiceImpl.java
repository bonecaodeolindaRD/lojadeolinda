package br.com.rd.dashboard.services.user;

import br.com.rd.dashboard.models.entities.Employee;
import br.com.rd.dashboard.repositories.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Component
public class UserServiceImpl implements UserService{

    @Autowired
    private EmployeeRepository repository;

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        Employee emp = repository.findByUsername(s).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Employee not found"));
        List<GrantedAuthority> autority = AuthorityUtils.createAuthorityList(emp.getHierarchy().getName());

        return new User(emp.getUsername(), emp.getPassword(), autority);
    }

}
