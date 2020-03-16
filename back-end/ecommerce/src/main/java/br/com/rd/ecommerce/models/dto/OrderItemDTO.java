package br.com.rd.ecommerce.models.dto;

import br.com.rd.ecommerce.models.entities.Order;
import br.com.rd.ecommerce.models.entities.Product;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderItemDTO {

    private Long id;
    private Product product;
    private Integer quantity;
    private Double value;


}
