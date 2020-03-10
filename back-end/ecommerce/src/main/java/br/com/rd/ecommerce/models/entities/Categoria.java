package br.com.rd.ecommerce.models.entities;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.persistence.*;

@Data
@AllArgsConstructor
@Entity
@Table (name = "tb_categoria")

public class Categoria {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name ="cd_categoria")
    private Integer codigo ;

    @Column(name = "ds_categoria")
    private String descricao;
}
