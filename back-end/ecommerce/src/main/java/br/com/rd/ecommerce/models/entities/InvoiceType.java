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
@Table(name = "tb_invoice_type")
public class InvoiceType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_invoicetype")
    private Integer id;
    @Column(name = "ds_name", nullable = false)
    private String name;
    @OneToMany(targetEntity = Invoice.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "id_invoice_type")
    private List<Invoice> invoices;


}
