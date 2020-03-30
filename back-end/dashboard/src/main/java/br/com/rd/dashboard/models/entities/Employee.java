package br.com.rd.dashboard.models.entities;


import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

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
    @NotBlank
    @Size(min = 10)
    private String name;
    @NotBlank
    @Column(name = "ds_email", unique = true)
    @Email
    private String email;
    @Lob
    @Column(name = "ds_password", nullable = false)
    @NotBlank
    private String password;
    @Column(name = "ds_username", nullable = false, unique = true)
    @NotBlank
    private String username;
    @ManyToOne
    @JoinColumn(name = "id_hierarchy")
    @NotBlank
    private Hierarchy hierarchy;
}
