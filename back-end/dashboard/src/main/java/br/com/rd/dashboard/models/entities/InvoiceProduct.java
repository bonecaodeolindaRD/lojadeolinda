package br.com.rd.dashboard.models.entities;


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
    @ManyToOne
    @JoinColumn(name = "id_invoice")
    private Invoice invoice;
    @ManyToOne
    @JoinColumn(name = "id_product")
    private Product product;
    @Column(name = "nr_quantity", nullable = false)
    private Integer quantity;
    @Column(name = "vl_value", nullable = false)
    private Double value;
}
