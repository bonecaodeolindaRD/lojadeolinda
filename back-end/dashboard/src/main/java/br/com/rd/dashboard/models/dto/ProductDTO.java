package br.com.rd.dashboard.models.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {
    private Long id;
    @NotBlank
    private String name;
    @NotBlank
    private String description;
    @NotBlank
    private String image;
    @NotNull
    private Double price;
    @NotNull
    private Long category;
    @NotNull
    private Double width;
    @NotNull
    private Double height;
    @NotNull
    private Double weight;
    @NotNull
    private Double off;
}
