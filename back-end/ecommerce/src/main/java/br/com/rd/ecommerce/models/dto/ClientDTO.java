package br.com.rd.ecommerce.models.dto;
import br.com.rd.ecommerce.models.entities.Address;
import br.com.rd.ecommerce.models.entities.Order;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClientDTO {
    private Long id;
    private String name;
    private Date birthday;
    private String cpf;
    private String email;
    private String phoneNumber;
    private String password;
    private List<AddressDTO> addresses;
    private List<OrderDTO> orders;

    public void addOrder(OrderDTO order){
        if(orders == null) orders = new ArrayList<>();
        orders.add(order);
    }

    public void addAddress(AddressDTO addressDTO){
        if(addresses == null) addresses = new ArrayList<>();
        addresses.add(addressDTO);
    }
}
