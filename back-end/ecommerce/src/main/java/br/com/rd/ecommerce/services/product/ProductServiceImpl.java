package br.com.rd.ecommerce.services.product;

import br.com.rd.ecommerce.converters.Converter;
import br.com.rd.ecommerce.models.dto.AddressDTO;
import br.com.rd.ecommerce.models.dto.ProductDTO;
import br.com.rd.ecommerce.models.entities.Address;
import br.com.rd.ecommerce.models.entities.Category;
import br.com.rd.ecommerce.models.entities.Product;
import br.com.rd.ecommerce.repositories.ProductRepository;
import br.com.rd.ecommerce.services.exceptions.ProductException;
import org.hibernate.JDBCException;
import org.hibernate.exception.SQLGrammarException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.server.ResponseStatusException;

import javax.persistence.EntityManager;
import javax.persistence.EntityNotFoundException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.sql.SQLException;
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
    public ResponseEntity<?> findProductById(Long id) {

        Product product = repository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found"));

        ProductDTO productDTO = converter.convertTo(product);

        return ResponseEntity.status(HttpStatus.OK).body(productDTO);

    }

    @Override
    public ResponseEntity<?> findProductByName(String name) {

        Query query = em.createQuery("select p from Product p where upper(p.name) like concat('%', :name, '%'", Product.class);
        query.setParameter("name", name.toUpperCase());

        List<Product> products = query.getResultList();
        if (products == null || products.size() <= 0)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        List<ProductDTO> productDTOS = new ArrayList<>();
        for (Product p : products)
            productDTOS.add(converter.convertTo(p));
        return ResponseEntity.status(HttpStatus.OK).body(productDTOS);
    }


    @Override
    public ResponseEntity<?> findProductByDescription(String description) {

        Query query = em.createQuery("select p from Product p where upper(description) like concat('%', :desc, '%'", Product.class);
        query.setParameter("desc", description.toUpperCase());

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
        Query name = em.createQuery("select p from Product p where upper(name) like concat('%', :name, '%')" , Product.class);
        name.setParameter("name", str.toUpperCase());
        Query desc = em.createQuery("select p from Product p where upper(description) like concat('%', :desc, '%')", Product.class);
        desc.setParameter("desc", str.toUpperCase());
        //Query categ = em.createQuery("select p from Product p inner join Category c on c.id = p.category where upper(c.name) like concat('%', :categ, '%'", Product.class);
        //categ.setParameter("categ",str.toUpperCase());
        List<Product> prods = name.getResultList();
        products.addAll(prods);
        prods = desc.getResultList();
        products.addAll(prods);
        //prods = categ.getResultList();
        products.addAll(prods);
        if (products.size() <= 0)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        return ResponseEntity.status(HttpStatus.OK).body(products);
    }

    @Override
    public ResponseEntity<?> totalItems() {
        Query query = em.createQuery("select count(*) from Product");

        Long quantity = (Long)query.getResultList().get(0);

        return ResponseEntity.status(HttpStatus.OK).body(quantity);
    }

    @Override
    public ResponseEntity<?> orderByName(Integer asdesc, Integer itensPerPage, Integer page) {

        Query query = em.createQuery("select p from Product p order by p.name " + (asdesc == 0 ? "" : "desc"), Product.class)
                .setFirstResult(page * itensPerPage)
                .setMaxResults(itensPerPage);

        List<Product> products = query.getResultList();

        if(products == null || products.size() <= 0)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ProductException("Products not found"));

        return ResponseEntity.status(HttpStatus.OK).body(products);

    }

    @Override
    public ResponseEntity<?> orderByPrice(Integer desc, Integer itensPerPage, Integer page) {

        Query query = em.createQuery("select p from Product p order by (p.price - p.price * p.off) " +
                (desc == 0 ? "" : "desc"), Product.class)
                .setFirstResult(page * itensPerPage)
                .setMaxResults(itensPerPage);

        List<Product> products = query.getResultList();
        if(products == null || products.size() <= 0)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ProductException("Products not found"));

        return ResponseEntity.status(HttpStatus.OK).body(products);

    }

    @Override
    public ResponseEntity<?> orderByOcurrence(Integer desc, Integer itensPerPage, Integer page) {
        Query query = em.createQuery("select p, count(oi.product) as qtd from Product p left join OrderItem oi on " +
                "oi.product = p.id " +
                "group by p.id " +
                "order by qtd " +
                (desc == 0 ? "" : "desc"))
                .setFirstResult(page * itensPerPage)
                .setMaxResults(itensPerPage);

        List<Product> products = query.getResultList();
        if(products == null || products.size() <= 0)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ProductException("Products not found"));

        return ResponseEntity.status(HttpStatus.OK).body(products);

    }

    @Override
    public ResponseEntity<?> findProductHome() {
        Query query = em.createQuery("select p from Product p inner join StockProduct s on s.product = p.id where s.balance > 0 order by p.off desc", Product.class).setMaxResults(8);
        List<Product> products = query.getResultList();
        if (products == null || products.size() <= 0)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        List<ProductDTO> pDTO = new ArrayList<>();
        for (Product p : products)
            pDTO.add(converter.convertTo(p));
        return ResponseEntity.status(HttpStatus.OK).body(pDTO);
    }

}
