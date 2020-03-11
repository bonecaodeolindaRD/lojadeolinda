package br.com.rd.ecommerce.models.entities;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tb_order_item")
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_order_item")
    private Long id;
    @ManyToOne
    @JoinColumn(name = "id_order")
    private Order order;
    @ManyToOne
    @JoinColumn(name = "id_product")
    private Product product;
    @Column(name = "nr_quantity", nullable = false)
    private Integer quantity;
    @Column(name = "vl_value", nullable = false)
    private Double value;

}
