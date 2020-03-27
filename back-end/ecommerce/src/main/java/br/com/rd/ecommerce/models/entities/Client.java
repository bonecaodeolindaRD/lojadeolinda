package br.com.rd.ecommerce.models.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Table;
import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tb_client")
public class Client implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_client")
    private Long id;
    @Column(name = "ds_name", nullable = false, length = 100)
    private String name;
    @Temporal(TemporalType.DATE)
    @Column(name = "dt_birth")
    private Date birthday;
    @Column(name = "nr_cpf", nullable = false, length = 15)
    private String cpf;
    @Column(name = "ds_email", nullable = false, unique = true, length = 100)
    private String email;
    @Column(name = "nr_phone_number", nullable = false)
    private String phoneNumber;
    @Column(name = "ds_password", nullable = false)
    private String password;
    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL)
    private List<Address> addresses;
    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL)
    private List<Order> orders;
    @Column(name="ds_nivel_acesso")
    private String access;
}
