package br.com.rd.ecommerce.models.dto;
import br.com.rd.ecommerce.models.entities.Address;
import br.com.rd.ecommerce.models.entities.Order;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.br.CPF;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClientDTO {
    private Long id;
    @NotBlank
    @Size(min = 10)
    private String name;
    @NotNull
    private Date birthday;
    @CPF
    @NotBlank
    private String cpf;
    @Email
    @NotNull
    private String email;
    @NotBlank
    @Size(min = 10, max = 11)
    private String phoneNumber;
    private List<AddressDTO> addresses;
    private List<OrderDTO> orders;
    private String access;

    public void addOrder(OrderDTO order){
        if(orders == null) orders = new ArrayList<>();
        orders.add(order);
    }

    public void addAddress(AddressDTO addressDTO){
        if(addresses == null) addresses = new ArrayList<>();
        addresses.add(addressDTO);
    }
}
