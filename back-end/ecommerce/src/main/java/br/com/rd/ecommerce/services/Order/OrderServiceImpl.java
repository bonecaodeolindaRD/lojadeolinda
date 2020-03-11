package br.com.rd.ecommerce.services.Order;

import br.com.rd.ecommerce.models.entities.Client;
import br.com.rd.ecommerce.models.entities.Invoice;
import br.com.rd.ecommerce.models.entities.Order;
import br.com.rd.ecommerce.repositories.OrderRespository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRespository respository;

    @Override
    public ResponseEntity<List<Order>> findAllOrders() {
        List<Order> orders = respository.findAll();
        if(orders == null || orders.size() <= 0)
            return ResponseEntity.badRequest().build();
        return ResponseEntity.ok().body(orders);
    }

    @Override
    public ResponseEntity<List<Order>> findByDate(String date) {
        Date now = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
        try {
            Date dt = sdf.parse(date);
            if (!dt.before(now) || date == null)
                return ResponseEntity.badRequest().build();
            List<Order> orders = respository.findByDate(dt);
            if (orders == null || orders.size() <= 0)
                return ResponseEntity.badRequest().build();
            return ResponseEntity.ok().body(orders);
        } catch (ParseException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @Override
    public ResponseEntity<Order> findById(Long id) {
        return ResponseEntity.ok().body(respository.findById(id).get());
    }


    @Override
    public ResponseEntity<List<Order>> findByClient(Client client) {
        if(client == null)
            return ResponseEntity.badRequest().build();
        List<Order> orders = respository.findByClient(client);
        if(orders == null || orders.size() <= 0)
            return ResponseEntity.badRequest().build();
        return ResponseEntity.ok().body(orders);
    }
}
