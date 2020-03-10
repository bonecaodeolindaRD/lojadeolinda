package br.com.rd.ecommerce.models.entities;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table (name = "tb_produto")
public  class Produto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id ;


    @Column (name= "ds_produto")
    private Integer codProduto ;

    @Column (name ="ds_produto", nullable = false)
    private String descricao;

    @ManyToOne()
    @JoinColumn(name ="cd_codigo")
    private Categoria categoria ;

    private BigDecimal vlProduto;

}
