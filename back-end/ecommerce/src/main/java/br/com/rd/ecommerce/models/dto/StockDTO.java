package br.com.rd.ecommerce.models.dto;

import br.com.rd.ecommerce.models.entities.StockProduct;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StockDTO {
    private Long id;
    private String name;
    private List<StockProductDTO> stockProducts;
}
