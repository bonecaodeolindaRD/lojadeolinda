package br.com.rd.ecommerce.models.dto;
import br.com.rd.ecommerce.models.entities.Address;
import br.com.rd.ecommerce.models.entities.Order;

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
    private String phoneNumber;
    private String password;
    private List<Address> addresses;
    private List<Order> orders;

}
