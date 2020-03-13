package br.com.rd.ecommerce.converters;

import br.com.rd.ecommerce.models.dto.ProductDTO;
import br.com.rd.ecommerce.models.entities.Product;

public interface ProductConverter {
    Product DTOToProduct(ProductDTO productDTO);
    ProductDTO productToDTO(Product product);
}
