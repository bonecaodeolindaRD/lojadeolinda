package br.com.rd.ecommerce.models.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tb_categorias")
public class Categorias {
    @GeneratedValue
    @Id
    private Integer id ;

    @Column(name = "ds_name")
    private String name;

}
