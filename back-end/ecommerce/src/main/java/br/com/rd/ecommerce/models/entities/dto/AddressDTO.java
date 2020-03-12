package br.com.rd.ecommerce.models.entities.dto;

import br.com.rd.ecommerce.models.entities.Client;
import br.com.rd.ecommerce.models.entities.Provider;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddressDTO {
    private Long id;
    private String street;
    private String CEP;
    private String district;
    private Integer number;
    private String UF;
}
