package br.com.rd.ecommerce.models.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class AddressDTO {
    private Long id;
    private String street;
    private String CEP;
    private String district;
    private Integer number;
    private String UF;
}
