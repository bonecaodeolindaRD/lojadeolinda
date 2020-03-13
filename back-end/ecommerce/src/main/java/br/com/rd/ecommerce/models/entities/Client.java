package br.com.rd.ecommerce.models.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
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
    @Column(name = "nr_cpf", nullable = false, unique = true, length = 15)
    private String CPF;
    @Column(name = "ds_email", nullable = false, unique = true, length = 100)
    private String email;
    @Column(name = "nr_phone_number", nullable = false)
    private Long phoneNumber;
    @Column(name = "ds_password", nullable = false)
    private String password;
    @OneToMany(mappedBy = "client")
    private List<Address> addresses;
    @OneToMany(mappedBy = "client")
    private List<Order> orders;
}
