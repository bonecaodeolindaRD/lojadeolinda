package br.com.rd.ecommerce.converters;

import br.com.rd.ecommerce.models.dto.*;
import br.com.rd.ecommerce.models.entities.*;

public class Converter implements ProductConverter, OrderConverter, ClientConverter,
        AddressConverter, OrderItemConverter, CategoryConverter {
    @Override
    public Product DTOToProduct(ProductDTO productDTO) {
        return null;
    }

    @Override
    public ProductDTO productToDTO(Product product) {
        ProductDTO productDTO = new ProductDTO();
        productDTO.setCategory(product.getCategory().getId());
        productDTO.setDescription(product.getDescription());
        productDTO.setId(product.getId());
        productDTO.setImage(product.getImage());
        productDTO.setName(product.getName());
        productDTO.setPrice(product.getPrice());
        return productDTO;
    }

    @Override
    public Order DTOToOrder(OrderDTO orderDTO) {
        return null;
    }

    @Override
    public OrderDTO orderToOrderDTO(Order order) {
        OrderDTO orderDTO = new OrderDTO();
        orderDTO.setAddress(addressToAddressDTO(order.getAddress()));
        orderDTO.setId(order.getId());
        orderDTO.setValue(order.getValue());
        orderDTO.setDate(order.getDate());
        orderDTO.setStatus(order.getStatus());
        orderDTO.setClient(clientToClientDTO(order.getClient()));
        for(OrderItem oi: order.getOrderItem())
            orderDTO.addItem(orderItemToOrderItemDTO(oi));
        return orderDTO;
    }

    @Override
    public Client DTOToClient(ClientDTO clientDTO) {
        return null;
    }

    @Override
    public ClientDTO clientToClientDTO(Client client) {
        ClientDTO clientDTO = new ClientDTO();
        clientDTO.setCPF(client.getCPF());
        clientDTO.setEmail(client.getEmail());
        clientDTO.setId(client.getId());
        clientDTO.setName(client.getName());
        clientDTO.setPhoneNumber(client.getPhoneNumber());
        return clientDTO;
    }

    @Override
    public Address DTOToAddress(AddressDTO addressDTO) {
        return null;
    }

    @Override
    public AddressDTO addressToAddressDTO(Address address) {
        AddressDTO aDTO = new AddressDTO();
        aDTO.setCEP(address.getCEP());
        aDTO.setDistrict(address.getDistrict());
        aDTO.setId(address.getId());
        aDTO.setNumber(address.getNumber());
        aDTO.setStreet(address.getStreet());
        aDTO.setUF(address.getUF());
        return aDTO;
    }

    @Override
    public OrderItem DTOToOrderItem(OrderItemDTO orderItemDTO) {
        return null;
    }

    @Override
    public OrderItemDTO orderItemToOrderItemDTO(OrderItem orderItem) {
        OrderItemDTO oiDTO = new OrderItemDTO();
        oiDTO.setId(orderItem.getId());
        oiDTO.setProduct(orderItem.getProduct());
        oiDTO.setQuantity(orderItem.getQuantity());
        oiDTO.setValue(orderItem.getValue());
        return oiDTO;
    }

    @Override
    public Category DTOToCategory(CategoryDTO categoryDTO) {
        return null;
    }

    @Override
    public CategoryDTO categoryToCategoryDTO(Category category) {
        CategoryDTO c = new CategoryDTO();
        c.setName(category.getName());
        c.setId(category.getId());
        return c;
    }
}
