package br.com.rd.dashboard.models.entities;


import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tb_employee")
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_employee")
    private Long id;
    @Column(name = "ds_name", nullable = false, length = 100)
    private String name;
    @Column(name = "ds_email", unique = true)
    private String email;
    @Lob
    @Column(name = "ds_password", nullable = false)
    private String password;
    @Column(name = "ds_username", nullable = false, unique = true)
    private String username;
    @ManyToOne
    @JoinColumn(name = "id_hierarchy")
    @JsonBackReference
    private Hierarchy hierarchy;
}
