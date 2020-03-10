package br.com.rd.ecommerce.models.entities;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tb_invoice_product")
public class InvoiceProduct {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_invoice_product")
    private Long id;
    @Column(name = "nr_quantity", nullable = false)
    private Integer quantity;
    @Column(name = "vl_value", nullable = false)
    private Double value;

    @ManyToOne(targetEntity = Product.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "id_produto")
    private Product product;

    @ManyToOne(targetEntity = Invoice.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "id_invoice")
    private Invoice invoice;
}
