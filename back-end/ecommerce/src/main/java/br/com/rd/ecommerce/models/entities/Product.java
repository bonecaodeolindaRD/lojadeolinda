package br.com.rd.ecommerce.models.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.persistence.criteria.CriteriaBuilder;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
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
    @Column(name = "lk_img", nullable = false)
    private String linkImg;
    @Column(name = "vl_price", nullable = false)
    private Double price;
    @ManyToOne(targetEntity = Category.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "id_category")
    private Category category;
    @OneToMany(targetEntity = OrderItem.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "id_product")
    private List<OrderItem> orderItems;
    @OneToMany(targetEntity = StockProduct.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "id_product")
    private List<StockProduct> stockProducts;
    @OneToMany(targetEntity = InvoiceProduct.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "id_product")
    private List<InvoiceProduct> invoiceProduct;
}
