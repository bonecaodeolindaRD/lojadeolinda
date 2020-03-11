package br.com.rd.ecommerce.models.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

<<<<<<< HEAD
import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Table;
=======
import javax.persistence.*;
import java.util.List;
>>>>>>> 83b64d82797d83c6bd909bc1601f31b14abbd9c0

@Data
@NoArgsConstructor
@AllArgsConstructor

@Table(name = "tb_client")
public class Client {
<<<<<<< HEAD

    @Column
    @GeneratedValue
    private Integer id;


    @Column
    private String name;


    @Column
    private String CPF;


    @Column
    private String email;


    @Column
    private Long phoneNumber;


    @Column
=======
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_name")
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
>>>>>>> 83b64d82797d83c6bd909bc1601f31b14abbd9c0
    private String password;
    @OneToMany(mappedBy = "client")
    private List<Address> addresses;
    @OneToMany(mappedBy = "client")
    private List<Order> orders;
}
