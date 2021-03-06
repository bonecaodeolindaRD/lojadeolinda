package br.com.rd.dashboard.converter;

import br.com.rd.dashboard.models.dto.*;
import br.com.rd.dashboard.models.entities.*;

public class Converter {

    public Employee convertTo(EmployeeDTO employeeDTO){
        Employee emp = new Employee();
        emp.setId(employeeDTO.getId());
        if(employeeDTO.getEmail() != null)
            emp.setEmail(employeeDTO.getEmail());
        emp.setHierarchy(convertTo(employeeDTO.getHierarchy()));
        emp.setName(employeeDTO.getName());
        emp.setPassword(employeeDTO.getPassword());
        emp.setUsername(employeeDTO.getUsername());
        return emp;
    }

    public EmployeeDTO convertTo(Employee employee){
        EmployeeDTO emp = new EmployeeDTO();
        emp.setId(employee.getId());
        if(employee.getEmail() != null)
            emp.setEmail(employee.getEmail());
        emp.setHierarchy(convertTo(employee.getHierarchy()));
        emp.setName(employee.getName());
        emp.setUsername(employee.getUsername());
        return emp;
    }

    public Hierarchy convertTo(HierarchyDTO hierarchyDTO){
        Hierarchy hierarchy = new Hierarchy();
        hierarchy.setId(hierarchyDTO.getId());
        hierarchy.setName(hierarchyDTO.getName());
        return hierarchy;
    }

    public HierarchyDTO convertTo(Hierarchy hierarchy){
        HierarchyDTO hierarchyDTO = new HierarchyDTO();
        hierarchyDTO.setId(hierarchy.getId());
        hierarchyDTO.setName(hierarchy.getName());
        return hierarchyDTO;
    }

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
        orderDTO.setShipping(order.getShipping());
        orderDTO.setValue(order.getValue());
        return orderDTO;
    }


    public Client convertTo(ClientDTO clientDTO) {
        Client client = new Client();
        client.setId(clientDTO.getId());
        client.setCpf(clientDTO.getCpf());
        client.setEmail(clientDTO.getEmail());
        client.setName(clientDTO.getName());
        client.setBirthday(clientDTO.getBirthday());
        client.setPhoneNumber(clientDTO.getPhoneNumber());
        return client;
    }


    public ClientDTO convertTo(Client client) {
        ClientDTO clientDTO = new ClientDTO();
        clientDTO.setCpf(client.getCpf());
        clientDTO.setEmail(client.getEmail());
        clientDTO.setId(client.getId());
        clientDTO.setName(client.getName());
        clientDTO.setBirthday(client.getBirthday());
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
        address.setCitie(addressDTO.getCitie());
        address.setComplement(addressDTO.getComplement());
        //address.setClient(convertTo(addressDTO.getClient()));
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
        aDTO.setCitie(address.getCitie());
        aDTO.setComplement(address.getComplement());
        //aDTO.setClient(convertTo(address.getClient()));
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

    public Stock convertTo(StockDTO stockDTO){
        Stock stock = new Stock();
        stock.setId(stockDTO.getId());
        stock.setName(stockDTO.getName());
        return stock;
    }

    public StockDTO convertTo(Stock stock){
        StockDTO stockDTO = new StockDTO();
        stockDTO.setName(stock.getName());
        stockDTO.setId(stock.getId());
        return stockDTO;
    }

    public StockProduct convertTo(StockProductDTO stockProductDTO){
        StockProduct stockProduct = new StockProduct();
        stockProduct.setBalance(stockProductDTO.getBalance());
        stockProduct.setId(stockProductDTO.getId());
        stockProduct.setProduct(convertTo(stockProductDTO.getProduct()));
        stockProduct.setStock(convertTo(stockProductDTO.getStock()));
        return stockProduct;
    }

    public StockProductDTO convertTo(StockProduct stockProduct){
        StockProductDTO stockProductDTO = new StockProductDTO();
        stockProductDTO.setBalance(stockProduct.getBalance());
        stockProductDTO.setId(stockProduct.getId());
        stockProductDTO.setProduct(convertTo(stockProduct.getProduct()));
        stockProductDTO.setStock(convertTo(stockProduct.getStock()));
        return stockProductDTO;
    }

}
