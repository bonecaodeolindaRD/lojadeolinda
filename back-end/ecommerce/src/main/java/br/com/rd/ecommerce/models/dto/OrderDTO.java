package br.com.rd.ecommerce.models.dto;

import br.com.rd.ecommerce.models.entities.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderDTO {

    private Long id;
    private Double value;
    private Date date;
    private ClientDTO client;
    private Status status;
    private List<OrderItemDTO> orderItem;
    private AddressDTO address;

    public void addItem(OrderItemDTO item){
        if(orderItem == null) orderItem = new ArrayList<>();
        orderItem.add(item);
    }
}
