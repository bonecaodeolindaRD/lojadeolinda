package br.com.rd.dashboard.models.dto;

import br.com.rd.dashboard.models.entities.Product;
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
