package br.com.rd.ecommerce.models.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.persistence.criteria.CriteriaBuilder;
import java.util.List;
import java.util.Objects;

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
    @Lob
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Product product = (Product) o;
        return Objects.equals(id, product.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    //    public double value(){
//        try {
//            return price - price * off;
//        } catch (NullPointerException e){
//            return price;
//        }
//    }

}
