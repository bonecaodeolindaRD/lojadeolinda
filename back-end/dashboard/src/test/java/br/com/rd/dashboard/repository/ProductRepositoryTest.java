package br.com.rd.dashboard.repository;


import br.com.rd.dashboard.models.entities.Category;
import br.com.rd.dashboard.models.entities.Product;
import br.com.rd.dashboard.repositories.CategoryRepository;
import br.com.rd.dashboard.repositories.ProductRepository;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.test.context.junit4.SpringRunner;

@DataJpaTest
@RunWith(SpringRunner.class)
public class ProductRepositoryTest {

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CategoryRepository categoryRepository;

    @Rule
    public ExpectedException thrown = ExpectedException.none();

    @Test
    public void registerProductAndCategoryExpectedReturnSuccess(){

        Category category = new Category(null, "Teste");

        Category persistCategory = categoryRepository.save(category);

        Product product = new Product();
        product.setCategory(persistCategory);
        product.setDescription("Test test test test test test");
        product.setHeight(5.0);
        product.setImage("www.google.com");
        product.setName("Test tes test");
        product.setOff(0.02);
        product.setPrice(4582.00);
        product.setWeight(487.0);
        product.setWidth(15.0);

        Product persistProduct = productRepository.save(product);

    }

    @Test
    public void registerProductWithoutExistentCategoryExpectedReturnError(){

        thrown.expect(DataIntegrityViolationException.class);
        Product product = new Product();
        product.setCategory(new Category(0L, null));
        product.setDescription("Test test test test test test");
        product.setHeight(5.0);
        product.setImage("www.google.com");
        product.setName("Test tes test");
        product.setOff(0.02);
        product.setPrice(4582.00);
        product.setWeight(487.0);
        product.setWidth(15.0);

        Product persistProduct = productRepository.save(product);

    }

}
