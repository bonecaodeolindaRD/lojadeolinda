package br.com.rd.ecommerce.services.product;

import br.com.rd.ecommerce.converters.Converter;
import br.com.rd.ecommerce.models.dto.AddressDTO;
import br.com.rd.ecommerce.models.dto.ProductDTO;
import br.com.rd.ecommerce.models.entities.Address;
import br.com.rd.ecommerce.models.entities.Category;
import br.com.rd.ecommerce.models.entities.Product;
import br.com.rd.ecommerce.repositories.ProductRepository;
import br.com.rd.ecommerce.services.exceptions.ProductException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

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
        try {
            List<Product> products = repository.findAll();
            if (products == null || products.size() <= 0)
                return ResponseEntity.notFound().build();
            List<ProductDTO> productsDTO = new ArrayList<>();
            for (Product p : products)
                productsDTO.add(converter.convertTo(p));

            return ResponseEntity.ok().body(productsDTO);
        }catch(Exception e){
            return ResponseEntity.badRequest().body(new ProductException("Erro ") + e.getMessage());
        }
    }



    @Override
    public ResponseEntity<?> findProductById(Long id) {
        if (id == null || id <= 0)
            return ResponseEntity.badRequest().body(new ProductException("Favor informe um id"));
        try {
            Product product = repository.findById(id).orElse(null);
            if(product == null)
                return ResponseEntity.notFound().build();
            ProductDTO productDTO = converter.convertTo(product);

            return ResponseEntity.ok().body(productDTO);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ProductException("Erro ") + e.getMessage());
        }
    }

    @Override
    public ResponseEntity<?> findProductByName(String name) {
        if (name == null || name.equals(""))
            return ResponseEntity.badRequest().body(new ProductException("Favor informe o nome de um produto"));

        Query query = em.createQuery("select p from Product p where upper(p.name) like '%" + name.toUpperCase() + "%'", Product.class);

        try {
            List<Product> products = query.getResultList();
            if (products == null || products.size() <= 0)
                return ResponseEntity.notFound().build();
            List<ProductDTO> productDTOS = new ArrayList<>();
            for (Product p : products)
                productDTOS.add(converter.convertTo(p));
            return ResponseEntity.ok().body(productDTOS);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ProductException("Erro ") + e.getMessage());
        }
    }


    @Override
    public ResponseEntity<?> findProductByDescription(String description) {
        if (description == null || description.equals(""))
            return ResponseEntity.badRequest().body(new ProductException("Digite uma descricao para o produto"));

        Query query = em.createQuery("select p from Product p where upper(description) like '%" + description.toUpperCase() + "%'", Product.class);
        try {
            List<Product> products = query.getResultList();
            if (products == null || products.size() <= 0)
                return ResponseEntity.notFound().build();
            List<ProductDTO> productDTOS = new ArrayList<>();
            for (Product p : products)
                productDTOS.add(converter.convertTo(p));
            return ResponseEntity.ok().body(productDTOS);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ProductException("Erro: ") + e.getMessage());
        }
    }

    @Override
    public ResponseEntity<?> findProductByCategory(Long category) {
        if (category == null || category <= 0)
            return ResponseEntity.badRequest().body(new ProductException("Favor informe uma categoria"));
        Category categ = new Category();
        categ.setId(category);
        try {
            List<Product> products = repository.findByCategory(categ);
            if (products == null || products.size() <= 0)
                return ResponseEntity.notFound().build();
            List<ProductDTO> productDTOS = new ArrayList<>();
            for (Product p : products)
                productDTOS.add(converter.convertTo(p));
            return ResponseEntity.ok().body(productDTOS);
        } catch (Exception e){
            return ResponseEntity.badRequest().body(new ProductException("Erro: ") + e.getMessage());
        }
    }

    @Override
    public ResponseEntity<?> findProductByNameOrDescription(String str) {
        Set<Product> products = new HashSet<>();
        Query name = em.createQuery("select p from Product p where upper(name) like '%" + str.toUpperCase() + "%'", Product.class);
        Query desc = em.createQuery("select p from Product p where upper(description) like '%" + str.toUpperCase() + "%'", Product.class);
        Query categ = em.createQuery("select p from Product p inner join Category c on c.id = p.category where upper(c.name) like '%" + str.toUpperCase() + "%'", Product.class);
        try{
            List<Product> prods = name.getResultList();
            products.addAll(prods);
            prods = desc.getResultList();
            products.addAll(prods);
            prods = categ.getResultList();
            products.addAll(prods);
            if(products.size() <= 0)
                return ResponseEntity.notFound().build();
            return ResponseEntity.ok().body(products);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(new ProductException("Erro: ") + e.getMessage());
        }
    }

    @Override
    public ResponseEntity<?> findProductHome() {
        Query query = em.createQuery("select p from Product p inner join StockProduct s on s.product = p.id where s.balance > 0 order by p.off desc", Product.class).setMaxResults(8);
        try{
            List<Product> products = query.getResultList();
            if(products == null || products.size() <= 0)
                return ResponseEntity.notFound().build();
            List<ProductDTO> pDTO = new ArrayList<>();
            for(Product p: products)
                pDTO.add(converter.convertTo(p));
            return ResponseEntity.ok().body(pDTO);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(new ProductException("Erro " + e.getMessage()));
        }
    }

    @Override
    public ResponseEntity<?> createProduct(ProductDTO productDTO) {
        if (productDTO == null)
            return ResponseEntity.badRequest().body(new ProductException("O produto esta vazio"));
        if(productDTO.getPrice() <= 0)
            return ResponseEntity.badRequest().body(new ProductException("O preco do produto não pode ser menor ou igual a zero"));
        if(productDTO.getHeight() <= 0)
            return ResponseEntity.badRequest().body(new ProductException("A altura do produto não pode ser menor ou igual a zero"));
        if(productDTO.getWidth() <= 0)
            return ResponseEntity.badRequest().body(new ProductException("A largura do produto não pode ser menor ou igual a zero"));
        if(productDTO.getWeight() <= 0)
            return ResponseEntity.badRequest().body(new ProductException("O peso do produto não pode ser menor ou igual a zero"));
        if(productDTO.getOff() <= 0 || productDTO.getOff() >= 100)
            return ResponseEntity.badRequest().body(new ProductException("Valor do desconto é invalido"));
        
        Product product = converter.convertTo(productDTO);
        Query name = em.createQuery("select p from Product p where upper(name) like '%" + productDTO.getName().toUpperCase() + "%'", Product.class);
        Query desc = em.createQuery("select p from Product p where upper(description) like '%" + productDTO.getDescription().toUpperCase() + "%'", Product.class);
        try {
            List<Product> products = name.getResultList();
            if(products.size() > 0)
                return ResponseEntity.badRequest().body(new ProductException("Já existe um produto com esse nome, verifique se o produto ja esta cadastrado"));
            products = desc.getResultList();
            if(products.size() > 0)
                return ResponseEntity.badRequest().body(new ProductException("Pode ser que ja tenha um produto cadastrado com essa mesma descricao, verifique se o produto ja esta cadastrado"));
            Product returnEntity = repository.save(product);
            return ResponseEntity.ok().body(returnEntity);
        } catch (Exception e){
            return ResponseEntity.badRequest().body(new ProductException("Erro " + e.getMessage()));
        }
    }

    @Override
    public ResponseEntity<?> updateProduct(ProductDTO productDTO) {
        if (productDTO == null)
            return ResponseEntity.badRequest().body(new ProductException("O produto esta vazio"));
        if(productDTO.getPrice() <= 0)
            return ResponseEntity.badRequest().body(new ProductException("O preco do produto não pode ser menor ou igual a zero"));
        if(productDTO.getHeight() <= 0)
            return ResponseEntity.badRequest().body(new ProductException("A altura do produto não pode ser menor ou igual a zero"));
        if(productDTO.getWidth() <= 0)
            return ResponseEntity.badRequest().body(new ProductException("A largura do produto não pode ser menor ou igual a zero"));
        if(productDTO.getWeight() <= 0)
            return ResponseEntity.badRequest().body(new ProductException("O peso do produto não pode ser menor ou igual a zero"));
        if(productDTO.getOff() <= 0 || productDTO.getOff() >= 100)
            return ResponseEntity.badRequest().body(new ProductException("Valor do desconto é invalido"));
        try {
            Product product = repository.findById(productDTO.getId()).get();
            Category category = new Category();
            category.setId(productDTO.getCategory());
            product.setCategory(category);
            product.setImage(productDTO.getImage());
            product.setDescription(productDTO.getDescription());
            product.setPrice(productDTO.getPrice());
            product.setName(productDTO.getName());
            Product productReturn = repository.save(product);
            return ResponseEntity.ok().body(productReturn);
        } catch (Exception e){
            return ResponseEntity.badRequest().body(new ProductException("Erro: ") + e.getMessage());
        }
    }


    @Override
    public void deleteProduct(Long id) {
        repository.deleteById(id);
    }

}
