package br.com.rd.dashboard.models.entities;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tb_stock")
public class Stock {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_stock")
    private Long id;
    @Column(name = "ds_name", nullable = false, length = 45)
    private String name;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_stock")
    private List<StockProduct> stockProducts;

    public void addProduct(StockProduct stockProduct){
        if(stockProducts == null) stockProducts = new ArrayList<>();
        stockProducts.add(stockProduct);
    }
}
