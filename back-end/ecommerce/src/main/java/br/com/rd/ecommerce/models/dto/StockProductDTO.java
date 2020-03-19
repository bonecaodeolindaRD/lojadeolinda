package br.com.rd.ecommerce.models.dto;

import br.com.rd.ecommerce.models.entities.Product;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class StockProductDTO {
    private Long id;
    private ProductDTO product;
    private StockDTO stock;
    private Integer balance;
}
