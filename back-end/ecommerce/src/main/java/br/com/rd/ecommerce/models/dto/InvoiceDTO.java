package br.com.rd.ecommerce.models.dto;

import br.com.rd.ecommerce.models.entities.InvoiceType;
import br.com.rd.ecommerce.models.entities.Order;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InvoiceDTO {

    private Long id;
    private Date date;
    private Double value;
    private InvoiceType invoiceType;

}
