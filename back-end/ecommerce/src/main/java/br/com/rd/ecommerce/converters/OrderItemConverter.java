package br.com.rd.ecommerce.converters;

import br.com.rd.ecommerce.models.dto.OrderItemDTO;
import br.com.rd.ecommerce.models.entities.OrderItem;

public interface OrderItemConverter {
    OrderItem DTOToOrderItem(OrderItemDTO orderItemDTO);
    OrderItemDTO orderItemToOrderItemDTO(OrderItem orderItem);
}
