package br.com.rd.ecommerce.models.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "tb_invoice")
public class Invoice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_invoice")
    private Long id;
    @Column(name = "dt_date", nullable = false)
    private Date date;
    @Column(name = "vl_value", nullable = false)
    private Double value;
    @OneToMany(targetEntity = InvoiceProduct.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "id_invoice")
    private List<InvoiceProduct> invoiceProduct;

    @OneToOne(targetEntity = Order.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "id_order")
    private Order order;
}
