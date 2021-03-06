package br.com.rd.dashboard.services.product;

import br.com.rd.dashboard.converter.Converter;
import br.com.rd.dashboard.models.dto.ProductDTO;
import br.com.rd.dashboard.models.entities.Category;
import br.com.rd.dashboard.models.entities.Product;
import br.com.rd.dashboard.repositories.ProductRepository;
import br.com.rd.dashboard.services.exceptions.ProductException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository repository;
    private Converter converter = new Converter();
    @PersistenceContext
    private EntityManager em;

    @Override
    public ResponseEntity<?> findAllProducts() {

        List<Product> products = repository.findAll();
        if (products.size() <= 0)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        List<ProductDTO> productsDTO = new ArrayList<>();
        for (Product p : products)
            productsDTO.add(converter.convertTo(p));

        return ResponseEntity.status(HttpStatus.OK).body(productsDTO);

    }


    @Override
    public ResponseEntity<?> findProductById(Long id) {

        Product product = repository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found"));

        ProductDTO productDTO = converter.convertTo(product);

        return ResponseEntity.status(HttpStatus.OK).body(productDTO);

    }

    @Override
    public ResponseEntity<?> findProductByName(String name) {

        Query query = em.createQuery("select p from Product p where upper(p.name) like '%" + name.toUpperCase() + "%'", Product.class);

        List<Product> products = query.getResultList();
        if (products == null || products.size() <= 0)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        List<ProductDTO> productDTOS = new ArrayList<>();
        for (Product p : products)
            productDTOS.add(converter.convertTo(p));
        return ResponseEntity.status(HttpStatus.OK).body(productDTOS);
    }

    @Override
    public ResponseEntity<?> findAllPages(Integer page, Integer itemsPerPage) {

        List<Product> list = repository.findAll(PageRequest.of(page, itemsPerPage)).toList();
        if(list.size() <= 0)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ProductException("Products not found"));

        List<ProductDTO> producsDTO = new ArrayList<>();
        for(Product p: list)
            producsDTO.add(converter.convertTo(p));

        return ResponseEntity.status(HttpStatus.OK).body(producsDTO);
    }

    @Override
    public ResponseEntity<?> totalPages(Integer quantityPerPage) {
        Query query = em.createQuery("select count(*) from Product");

        Long quantity = (Long)query.getResultList().get(0);

        return ResponseEntity.status(HttpStatus.OK).body(quantity);
    }


    @Override
    public ResponseEntity<?> findProductByDescription(String description) {

        Query query = em.createQuery("select p from Product p where upper(description) like '%" + description.toUpperCase() + "%'", Product.class);

        List<Product> products = query.getResultList();
        if (products == null || products.size() <= 0)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        List<ProductDTO> productDTOS = new ArrayList<>();
        for (Product p : products)
            productDTOS.add(converter.convertTo(p));
        return ResponseEntity.status(HttpStatus.OK).body(productDTOS);
    }



    @Override
    public ResponseEntity<?> findProductByCategory(Long category) {
        if (category == null || category <= 0)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ProductException("Favor informe uma categoria"));
        Category categ = new Category();
        categ.setId(category);

        List<Product> products = repository.findByCategory(categ).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found"));
        List<ProductDTO> productDTOS = new ArrayList<>();
        for (Product p : products)
            productDTOS.add(converter.convertTo(p));
        return ResponseEntity.status(HttpStatus.OK).body(productDTOS);
    }

    @Override
    public ResponseEntity<?> findProductByNameOrDescription(String str) {
        Set<Product> products = new HashSet<>();
        Query name = em.createQuery("select p from Product p where upper(name) like '%"
                + str.toUpperCase() + "%'", Product.class);
        Query desc = em.createQuery("select p from Product p where upper(description) like '%"
                + str.toUpperCase() + "%'", Product.class);
        Query categ = em.createQuery("select p from Product p inner join Category c on c.id = p.category " +
                "where upper(c.name) like '%" + str.toUpperCase() + "%'", Product.class);
        List<Product> prods = name.getResultList();
        products.addAll(prods);
        prods = desc.getResultList();
        products.addAll(prods);
        prods = categ.getResultList();
        products.addAll(prods);
        if (products.size() <= 0)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        return ResponseEntity.status(HttpStatus.OK).body(products);
    }

    @Override
    public ResponseEntity<?> findProductHome() {
        Query query = em.createQuery("select p from Product p inner join StockProduct s on s.product = p.id " +
                "where s.balance > 0 order by p.off desc", Product.class).setMaxResults(8);
        List<Product> products = query.getResultList();
        if (products == null || products.size() <= 0)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        List<ProductDTO> pDTO = new ArrayList<>();
        for (Product p : products)
            pDTO.add(converter.convertTo(p));
        return ResponseEntity.status(HttpStatus.OK).body(pDTO);
    }

    @Override
    public ResponseEntity<?> createProduct(ProductDTO productDTO) {
        if (productDTO == null)
            return ResponseEntity.badRequest().body(new ProductException("O produto esta vazio"));
        if (productDTO.getPrice() <= 0)
            return ResponseEntity.badRequest().body(new ProductException("O preco do produto não pode ser menor ou igual a zero"));
        if (productDTO.getHeight() <= 0)
            return ResponseEntity.badRequest().body(new ProductException("A altura do produto não pode ser menor ou igual a zero"));
        if (productDTO.getWidth() <= 0)
            return ResponseEntity.badRequest().body(new ProductException("A largura do produto não pode ser menor ou igual a zero"));
        if (productDTO.getWeight() <= 0)
            return ResponseEntity.badRequest().body(new ProductException("O peso do produto não pode ser menor ou igual a zero"));
        if (productDTO.getOff() <= 0 || productDTO.getOff() >= 100)
            return ResponseEntity.badRequest().body(new ProductException("Valor do desconto é invalido"));

        Product product = converter.convertTo(productDTO);
        Query name = em.createQuery("select p from Product p where upper(name) like '%" + productDTO.getName().toUpperCase() + "%'", Product.class);
        Query desc = em.createQuery("select p from Product p where upper(description) like '%" + productDTO.getDescription().toUpperCase() + "%'", Product.class);
        List<Product> products = name.getResultList();

        if (products.size() > 0)
            return ResponseEntity.badRequest().body(new ProductException("Já existe um produto com esse nome, verifique se o produto ja esta cadastrado"));
        products = desc.getResultList();
        if (products.size() > 0)
            return ResponseEntity.badRequest().body(new ProductException("Pode ser que ja tenha um produto cadastrado com essa mesma descricao, verifique se o produto ja esta cadastrado"));
        Product returnEntity = repository.save(product);
        return ResponseEntity.status(HttpStatus.CREATED).body(returnEntity);

    }

    @Override
    public ResponseEntity<?> updateProduct(Long id, ProductDTO productDTO) {
        if (productDTO == null)
            return ResponseEntity.badRequest().body(new ProductException("O produto esta vazio"));
        if (productDTO.getPrice() <= 0)
            return ResponseEntity.badRequest().body(new ProductException("O preco do produto não pode ser menor ou igual a zero"));
        if (productDTO.getHeight() <= 0)
            return ResponseEntity.badRequest().body(new ProductException("A altura do produto não pode ser menor ou igual a zero"));
        if (productDTO.getWidth() <= 0)
            return ResponseEntity.badRequest().body(new ProductException("A largura do produto não pode ser menor ou igual a zero"));
        if (productDTO.getWeight() <= 0)
            return ResponseEntity.badRequest().body(new ProductException("O peso do produto não pode ser menor ou igual a zero"));
        if (productDTO.getOff() <= 0 || productDTO.getOff() >= 100)
            return ResponseEntity.badRequest().body(new ProductException("Valor do desconto é invalido"));

        Product product = repository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found"));
        Category category = new Category();
        category.setId(productDTO.getCategory());
        product.setCategory(category);
        product.setImage(productDTO.getImage());
        product.setDescription(productDTO.getDescription());
        product.setPrice(productDTO.getPrice());
        product.setName(productDTO.getName());
        Product productReturn = repository.save(product);
        return ResponseEntity.status(HttpStatus.OK).body(productReturn);

    }


    @Override
    public void deleteProduct(Long id) {
        repository.deleteById(id);
    }


}
