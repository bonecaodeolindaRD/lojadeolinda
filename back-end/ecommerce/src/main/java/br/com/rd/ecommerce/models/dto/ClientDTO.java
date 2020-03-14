package br.com.rd.ecommerce.models.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClientDTO {
    private Long id;
    private String name;
    private String CPF;
    private String email;
    private Long phoneNumber;
    private List<AddressDTO> addresses;
    private List<OrderDTO> orders;
}
