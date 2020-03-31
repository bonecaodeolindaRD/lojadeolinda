package br.com.rd.ecommerce.models.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class AddressDTO {
    private Long id;
    @NotBlank
    private String street;
    @NotBlank
    @Size(min = 8, max = 10)
    private String cep;
    @NotBlank
    private String district;
    private String complement;
    @NotBlank
    private String citie;
    @NotNull
    private Integer number;
    @NotBlank
    private String uf;
    private ClientDTO client;
}
