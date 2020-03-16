package br.com.rd.ecommerce.models.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.persistence.criteria.CriteriaBuilder;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tb_product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_product")
    private Long id;
    @Column(name = "ds_name", nullable = false, length = 100)
    private String name;
    @Column(name = "tx_description", nullable = false)
    private String description;
    @Column(name = "lk_image", nullable = false)
    private String image;
    @Column(name = "vl_price", nullable = false)
    private Double price;
    @Column(name = "vl_off")
    private Double off;
    @Column(name = "vl_width")
    private Double width;
    @Column(name = "vl_height")
    private Double height;
    @Column(name = "vl_weight")
    private Double weight;
    @ManyToOne
    @JoinColumn(name = "id_category")
    private Category category;

    public double value(){
        return price - price * off;
    }

}
