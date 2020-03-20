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
    private String cep;
    private String district;
    private String complement;
    private String citie;
    private Integer number;
    private String uf;
    private ClientDTO client;
}
