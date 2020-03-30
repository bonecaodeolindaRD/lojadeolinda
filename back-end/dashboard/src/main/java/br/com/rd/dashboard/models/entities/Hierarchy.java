package br.com.rd.dashboard.models.entities;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tb_hierarchy")
public class Hierarchy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_hierarchy")
    private Long id;
    @Column(name = "ds_name")
    @NotBlank
    private String name;
    @OneToMany
    @JoinColumn(name = "id_hierarchy")
    private List<Employee> employees;

    public Hierarchy(Long hierarchy, String name) {
    }
}
