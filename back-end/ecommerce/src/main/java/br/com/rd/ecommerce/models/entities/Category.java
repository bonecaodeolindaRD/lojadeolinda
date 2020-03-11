package br.com.rd.ecommerce.models.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tb_category")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_category")
    private Long id;
    @Column(name = "ds_category", unique = true)
    private String name;
    @OneToMany(targetEntity = Product.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "id_category")
    private List<Product> product;
}
