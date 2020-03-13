package br.com.rd.ecommerce.converters;

import br.com.rd.ecommerce.models.dto.CategoryDTO;
import br.com.rd.ecommerce.models.entities.Category;

public interface CategoryConverter {
    Category DTOToCategory(CategoryDTO categoryDTO);
    CategoryDTO categoryToCategoryDTO(Category category);
}
