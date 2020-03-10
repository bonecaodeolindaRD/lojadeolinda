package br.com.rd.ecommerce.models.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tb_client")
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_client")
    private Long id;
    @Column(nullable = false, name = "ds_name", length = 100)
    private String name;
    @Column(nullable = false, name = "ds_CPF", length = 15)
    private String CPF;
    @Column(nullable = false, name ="ds_email", unique = true, length = 70)
    private String email;
    @Column(nullable = false, name = "nr_phone_number")
    private Long phoneNumber;
    @Column(nullable = false, name = "ds_password")
    private String password;
    @OneToMany(targetEntity = Address.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "id_client")
    private List<Address> addresses;
    @OneToMany(targetEntity = Order.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "id_client")
    private List<Order> orders;
}
