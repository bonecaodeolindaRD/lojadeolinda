package br.com.rd.ecommerce.models.entities;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.persistence.*;
import java.math.BigDecimal;

@Data
@AllArgsConstructor
@Entity
@Table (name = "tb_item_produto")
public class ItemProduto {
    @Column(name = "cd_pedido_item")
    @Id
    private Integer codigo;

    @Column(name = "vl_produto")
    private BigDecimal vlProduto;

    @Column(name = "vl_frete")
    private BigDecimal vlFrete;

    @Column(name = "quantidade")
    private Integer quantidade ;

    private BigDecimal codProduto;

    @ManyToOne()
    @JoinColumn(name = "cod_pedido")
    private Pedido pedido;
}
