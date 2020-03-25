package br.com.rd.ecommerce.services.client;

import br.com.rd.ecommerce.converters.Converter;
import br.com.rd.ecommerce.models.dto.ClientDTO;
import br.com.rd.ecommerce.models.dto.OrderDTO;
import br.com.rd.ecommerce.models.entities.Address;
import br.com.rd.ecommerce.models.entities.Client;

import br.com.rd.ecommerce.models.entities.Order;

import br.com.rd.ecommerce.models.entities.OrderItem;

import br.com.rd.ecommerce.repositories.ClientRepository;
import br.com.rd.ecommerce.services.exceptions.CategoryException;
import br.com.rd.ecommerce.services.exceptions.ClientException;
import org.hibernate.JDBCException;
import org.hibernate.exception.SQLGrammarException;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.server.ResponseStatusException;

import javax.persistence.EntityNotFoundException;
import java.sql.SQLException;
import java.sql.Time;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.TimeZone;

@Service("ClientService")
public class ClientServiceImpl implements ClientService {
    @Autowired
    ClientRepository clientRepository;
    private Converter converter = new Converter();

    public ResponseEntity<?> createClient(Client client) {
        if (client == null)
            return ResponseEntity.badRequest().body(new ClientException("Client is not be null"));
        try {
            SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy hh:MM:ss");
            sdf.setTimeZone(TimeZone.getTimeZone("GMT"));
            Calendar cal = Calendar.getInstance();
            client.setBirthday(sdf.parse(sdf.format(client.getBirthday())));
            cal.setTime(client.getBirthday());
            cal.add(Calendar.DAY_OF_WEEK, 1);
            client.setBirthday(cal.getTime());
            String password = client.getPassword();
            String salt = BCrypt.gensalt();
            String passwordHash = BCrypt.hashpw(password, salt);
            client.setPassword(passwordHash);
            Client clientReturn = clientRepository.save(client);
            return ResponseEntity.status(HttpStatus.OK).body(clientReturn);
        } catch (ParseException e) {
            return ResponseEntity.badRequest().body(new ClientException("Error, date format is invalid"));
        }
    }

    @Override
    public ResponseEntity<?> findAllClient() {
        List<Client> clients = clientRepository.findAll();

        if (clients.size() <= 0)
            return ResponseEntity.notFound().build();
        List<ClientDTO> clientDTO = new ArrayList<>();
        for (Client client : clients)
            clientDTO.add(converter.convertTo(client));

        return ResponseEntity.status(HttpStatus.OK).body(clientDTO);
    }

    @Override
    public ResponseEntity<?> findClientById(Long id) {

        Client client = clientRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Client not found"));

        ClientDTO clientDTO = converter.convertTo(client);
        return ResponseEntity.status(HttpStatus.OK).body(clientDTO);
    }

    @Override
    public void deleteClient(Long id) {
        clientRepository.deleteById(id);
    }

    @Override
    public ResponseEntity<?> findClientByEmail(String email) {
        Client clients = clientRepository.findByEmail(email).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Client not found"));;
        if (clients == null)
            return ResponseEntity.notFound().build();

        ClientDTO clientDTO = converter.convertTo(clients);
        return ResponseEntity.status(HttpStatus.OK).body(clientDTO);
    }

    @Override
    public ResponseEntity<?> findClientLogin(Client client) {
        if (client == null)
            return ResponseEntity.badRequest().body(new ClientException("Client is not be null"));

        Client c = clientRepository.findByEmail(client.getEmail()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Client not found"));

        if (c == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();

        String passHash = c.getPassword();
        if (BCrypt.checkpw(client.getPassword(), passHash)) {
            ClientDTO clientDTO = converter.convertTo(client);
            return ResponseEntity.status(HttpStatus.OK).body(clientDTO);
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ClientException("Error"));

    }

    public ResponseEntity<?> findClientOrders(String email) {

        Client client = clientRepository.findByEmail(email).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Client not found"));
        if (client == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();

        ClientDTO clientDTO = converter.convertTo(client);

        for (Order o : client.getOrders()) {
            OrderDTO orderDTO = converter.convertTo(o);
            for (OrderItem oi : o.getOrderItem())
                orderDTO.addItem(converter.convertTo(oi));
            orderDTO.setValue(o.total());
            clientDTO.addOrder(orderDTO);
        }
        return ResponseEntity.status(HttpStatus.OK).body(clientDTO);
    }

    public ResponseEntity<?> findClientAddress(String email) {

        Client client = clientRepository.findByEmail(email).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Client not found"));
        ClientDTO clientDTO = converter.convertTo(client);

        for (Address a : client.getAddresses())
            clientDTO.addAddress(converter.convertTo(a));

        return ResponseEntity.status(HttpStatus.OK).body(clientDTO);

    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<?> handlerEntityExceptionException(EntityNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex);
    }

    @ExceptionHandler(SQLException.class)
    public ResponseEntity<?> handlerSQLException(SQLException ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex);
    }

    @ExceptionHandler(JDBCException.class)
    public ResponseEntity<?> handlerJDBCException(JDBCException ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex);
    }

    @ExceptionHandler(SQLGrammarException.class)
    public ResponseEntity<?> handlerSQLGrammarException(SQLGrammarException ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleException(Exception ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex);
    }
}

