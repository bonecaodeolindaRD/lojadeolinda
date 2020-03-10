package br.com.rd.ecommerce.models.entities;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table (name = "tb_pedido")
public class Pedido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer codPedido;

    @Column(name = "dt_pedido")
    @Temporal(TemporalType.TIMESTAMP)
    private Date dtPedido;

    @Column(name = "vl_pedido")
    private BigDecimal vlPedido;

    @Column(name = "vl_frete")
    private BigDecimal vlFrete ;

    @Column(name = "")
    @OneToMany(mappedBy = "pedido")
    private List<ItemProduto> itemPedido;
}
