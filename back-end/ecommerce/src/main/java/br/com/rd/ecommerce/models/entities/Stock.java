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
@Table(name = "td_stock")
public class Stock {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_stock")
    private Integer id;
    @Column(name = "ds_name", nullable = false, length = 100)
    private String name;
    @OneToMany(targetEntity = StockProduct.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "id_stock")
    private List<StockProduct> stockProduct;
}
