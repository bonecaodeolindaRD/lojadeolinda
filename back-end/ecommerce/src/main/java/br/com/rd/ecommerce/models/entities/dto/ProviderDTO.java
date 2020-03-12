package br.com.rd.ecommerce.models.entities.dto;

import br.com.rd.ecommerce.models.entities.Address;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProviderDTO {

    private Long id;
    private String name;
    private String CNPJ;
    private List<Address> addresses;
}
