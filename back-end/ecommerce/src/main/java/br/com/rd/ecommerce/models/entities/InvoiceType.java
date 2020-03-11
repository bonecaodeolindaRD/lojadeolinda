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
@Table(name = "tb_invoice_type")
public class InvoiceType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_invoice_type")
    private Long id;
    @Column(name = "ds_name", nullable = false, length = 45)
    private String name;
}
