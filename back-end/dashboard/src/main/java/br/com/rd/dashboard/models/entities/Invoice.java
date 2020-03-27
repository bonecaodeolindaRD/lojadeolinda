package br.com.rd.dashboard.models.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tb_invoice")
public class Invoice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_invoice")
    private Long id;
    @Column(name = "dt_invoice")
    private Date date;
    @Column(name = "vl_invoice")
    private Double value;
    @ManyToOne
    @JoinColumn(name = "id_invoice_type")
    private InvoiceType invoiceType;
}
