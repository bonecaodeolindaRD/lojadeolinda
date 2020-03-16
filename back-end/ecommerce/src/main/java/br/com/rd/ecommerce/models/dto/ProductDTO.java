package br.com.rd.ecommerce.models.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {
    private Long id;
    private String name;
    private String description;
    private String image;
    private Double price;
    private Long category;
    private Double width;
    private Double height;
    private Double weight;
    private Double off;
}
