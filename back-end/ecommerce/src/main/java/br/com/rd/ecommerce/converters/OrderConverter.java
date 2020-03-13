package br.com.rd.ecommerce.converters;

import br.com.rd.ecommerce.models.dto.OrderDTO;
import br.com.rd.ecommerce.models.entities.Order;

public interface OrderConverter {
    Order DTOToOrder(OrderDTO orderDTO);
    OrderDTO orderToOrderDTO(Order order);
}
