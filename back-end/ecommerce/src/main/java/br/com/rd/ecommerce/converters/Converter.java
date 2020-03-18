package br.com.rd.ecommerce.converters;

import br.com.rd.ecommerce.models.dto.*;
import br.com.rd.ecommerce.models.entities.*;

public class  Converter {

    public Product convertTo(ProductDTO productDTO) {
        Product product = new Product();
        product.setPrice(productDTO.getPrice());
        product.setName(productDTO.getName());
        product.setDescription(productDTO.getDescription());
        product.setImage(productDTO.getImage());
        product.setId(productDTO.getId());
        Category category = new Category();
        category.setId(productDTO.getCategory());
        product.setCategory(category);
        product.setHeight(productDTO.getHeight());
        product.setWidth(productDTO.getWidth());
        product.setWeight(productDTO.getWeight());
        product.setOff(productDTO.getOff());
        return product;
    }


    public ProductDTO convertTo(Product product) {
        ProductDTO productDTO = new ProductDTO();
        productDTO.setCategory(product.getCategory().getId());
        productDTO.setDescription(product.getDescription());
        productDTO.setId(product.getId());
        productDTO.setImage(product.getImage());
        productDTO.setName(product.getName());
        productDTO.setPrice(product.getPrice());
        productDTO.setHeight(product.getHeight());
        productDTO.setWidth(product.getWidth());
        productDTO.setWeight(product.getWeight());
        productDTO.setOff(product.getOff());
        return productDTO;
    }


    public Order convertTo(OrderDTO orderDTO) {
        Order order = new Order();
        order.setStatus(orderDTO.getStatus());
        order.setDate(orderDTO.getDate());
        //order.setClient(convertTo(orderDTO.getClient()));
        order.setAddress(convertTo(orderDTO.getAddress()));
        order.setShipping(orderDTO.getShipping());
        return order;
    }


    public OrderDTO convertTo(Order order) {
        OrderDTO orderDTO = new OrderDTO();
        orderDTO.setAddress(convertTo(order.getAddress()));
        orderDTO.setId(order.getId());
        orderDTO.setDate(order.getDate());
        orderDTO.setStatus(order.getStatus());
        //orderDTO.setClient(convertTo(order.getClient()));
        orderDTO.setShipping(order.getShipping());
        return orderDTO;
    }


    public Client convertTo(ClientDTO clientDTO) {
        Client client = new Client();
        client.setId(clientDTO.getId());
        client.setCpf(clientDTO.getCpf());
        client.setEmail(clientDTO.getEmail());
        client.setName(clientDTO.getName());
        client.setPhoneNumber(clientDTO.getPhoneNumber());
        client.setPassword(clientDTO.getPassword());
        return client;
    }


    public ClientDTO convertTo(Client client) {
        ClientDTO clientDTO = new ClientDTO();
        clientDTO.setCpf(client.getCpf());
        clientDTO.setEmail(client.getEmail());
        clientDTO.setId(client.getId());
        clientDTO.setName(client.getName());
        clientDTO.setPhoneNumber(client.getPhoneNumber());
        return clientDTO;
    }


    public Address convertTo(AddressDTO addressDTO) {
        Address address = new Address();
        address.setId(addressDTO.getId());
        address.setUf(addressDTO.getUf());
        address.setCep(addressDTO.getCep());
        address.setDistrict(addressDTO.getDistrict());
        address.setNumber(addressDTO.getNumber());
        address.setStreet(addressDTO.getStreet());
        return address;
    }


    public AddressDTO convertTo(Address address) {
        AddressDTO aDTO = new AddressDTO();
        aDTO.setCep(address.getCep());
        aDTO.setDistrict(address.getDistrict());
        aDTO.setId(address.getId());
        aDTO.setNumber(address.getNumber());
        aDTO.setStreet(address.getStreet());
        aDTO.setUf(address.getUf());
        return aDTO;
    }


    public OrderItem convertTo(OrderItemDTO orderItemDTO) {
        OrderItem orderItem = new OrderItem();
        orderItem.setValue(orderItemDTO.getValue());
        orderItem.setQuantity(orderItemDTO.getQuantity());
        orderItem.setProduct(orderItemDTO.getProduct());
       // orderItem.setId(orderItemDTO.getId());
        return orderItem;
    }


    public OrderItemDTO convertTo(OrderItem orderItem) {
        OrderItemDTO oiDTO = new OrderItemDTO();
        oiDTO.setId(orderItem.getId());
        oiDTO.setProduct(orderItem.getProduct());
        oiDTO.setQuantity(orderItem.getQuantity());
        oiDTO.setValue(orderItem.getValue());
        return oiDTO;
    }


    public Category convertTo(CategoryDTO categoryDTO) {
        Category category = new Category();
        category.setId(categoryDTO.getId());
        category.setName(categoryDTO.getName());
        return category;
    }

    public CategoryDTO convertTo(Category category) {
        CategoryDTO c = new CategoryDTO();
        c.setName(category.getName());
        c.setId(category.getId());
        return c;
    }

    public Status convertTo(StatusDTO statusDTO){
        Status status = new Status();
        status.setStatus(statusDTO.getName());
        status.setIdStatus(statusDTO.getId());
        return status;
    }

    public StatusDTO convertTo(Status status){
        StatusDTO statusDTO = new StatusDTO();
        statusDTO.setId(status.getIdStatus());
        statusDTO.setName(status.getStatus());
        return statusDTO;
    }
}
