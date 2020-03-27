package br.com.rd.ecommerce.services.client;

import br.com.rd.ecommerce.models.entities.Client;
import br.com.rd.ecommerce.repositories.ClientRepository;
import br.com.rd.ecommerce.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        Client user = userRepository.findByEmail(email);

        List<GrantedAuthority> authorityList = AuthorityUtils.createAuthorityList(user.getAccess());
        return new User(
                user.getEmail(),
                user.getPassword(),
                authorityList
        );
    }
}
