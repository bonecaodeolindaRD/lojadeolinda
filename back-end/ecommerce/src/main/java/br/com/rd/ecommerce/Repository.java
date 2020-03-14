package br.com.rd.ecommerce;

import br.com.rd.ecommerce.models.entities.Client;
import br.com.rd.ecommerce.models.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface Repository {

    @org.springframework.stereotype.Repository
    public interface UserRepository extends JpaRepository<Client, Long> {
        //pegando um dado (id)
        List<User> findById(Integer id );
        List<User> findByStatus(Integer status);
        List<User> findByCpf(Integer cpf);
    }

}
