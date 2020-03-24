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
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.sql.Time;
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

    public ResponseEntity<?> createClient(ClientDTO clientDTO){
        if(clientDTO == null)
            return ResponseEntity.badRequest().body(new ClientException("Usuario Invalido!"));
        Client client = converter.convertTo(clientDTO);
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
            return ResponseEntity.ok().body(clientReturn);
        } catch (Exception e){
            return ResponseEntity.badRequest().body(new ClientException("Erro" + e.getMessage()));
        }
    }

    @Override
    public ResponseEntity<?> findAllClient() {
        try {
            List<Client> clients = clientRepository.findAll();

            if (clients == null || clients.size() <= 0)
                return ResponseEntity.notFound().build();
            List<ClientDTO> clientDTO = new ArrayList<>();
            for (Client client : clients)
                clientDTO.add(converter.convertTo(client));

            return ResponseEntity.ok().body(clientDTO);
        } catch (Exception e){
            return ResponseEntity.badRequest().body(new ClientException("Erro" + e.getMessage()));
        }
    }

    @Override
    public ResponseEntity<?> findClientById(Long id) {
        try {
            Client client = clientRepository.findById(id).orElse(null);
            if (client == null)
                return ResponseEntity.badRequest().body(new CategoryException("Nenhum dado encontrado"));
            ClientDTO clientDTO = converter.convertTo(client);
            return ResponseEntity.ok().body(clientDTO);
        } catch (Exception e){
            return ResponseEntity.badRequest().body(new ClientException("Erro" + e.getMessage()));
        }
    }

    @Override
    public void deleteClient(Long id) {
        clientRepository.deleteById(id);
    }

    @Override
    public ResponseEntity<?> findClientByEmail(String email) {
        if (email == null || email == "")
            return ResponseEntity.badRequest().body(new ClientException("Informe uma descricao"));
        try {
            Client clients = clientRepository.findByEmail(email);
            if (clients == null)
                return ResponseEntity.badRequest().body(new ClientException("Nenhum dado encontrado"));

            ClientDTO clientDTO = converter.convertTo(clients);
            return ResponseEntity.ok().body(clientDTO);
        } catch (Exception e){
            return ResponseEntity.badRequest().body(new ClientException("Erro" + e.getMessage()));
        }
    }

    @Override
    public ResponseEntity<?> findClientLogin(String email, String password) {
        if (email == null || email == "" || password == null || password == "")
            return ResponseEntity.badRequest().body(new ClientException("Informe o login do usuario"));
        try {
            Client client = clientRepository.findByEmail(email);

            if (client == null)
                return ResponseEntity.badRequest().body(new ClientException("Nenhum dado encontrado"));

            String passHash = client.getPassword();
            if(BCrypt.checkpw(password, passHash)) {
                ClientDTO clientDTO = converter.convertTo(client);
                return ResponseEntity.ok().body(clientDTO);
            }
            return ResponseEntity.badRequest().body(new ClientException("Erro ao logar"));
        } catch (Exception e){
            return ResponseEntity.badRequest().body(new ClientException("Erro" + e.getMessage()));
        }
    }

    public ResponseEntity<?> findClientOrders(String email){
        if(email == null || email =="")
            return ResponseEntity.badRequest().body(new ClientException("Erro informe um email"));
        try{
            Client client = clientRepository.findByEmail(email);
            if(client == null)
                return ResponseEntity.badRequest().body(new ClientException("Nenhum dado encontrado"));

            ClientDTO clientDTO = converter.convertTo(client);

            for(Order o: client.getOrders()){
                OrderDTO orderDTO = converter.convertTo(o);
                for(OrderItem oi: o.getOrderItem())
                    orderDTO.addItem(converter.convertTo(oi));
                orderDTO.setValue(o.total());
                clientDTO.addOrder(orderDTO);
            }
            return ResponseEntity.ok().body(clientDTO);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(new ClientException("Erro" + e.getMessage()));
        }
    }

    public ResponseEntity<?> findClientAddress(String email){
        if(email == null || email == "")
            return ResponseEntity.badRequest().body(new ClientException("Erro informe um email"));
        try{
            Client client = clientRepository.findByEmail(email);
            if(client == null )
                return ResponseEntity.badRequest().body(new ClientException("Nenhum cliente encontrado"));
            ClientDTO clientDTO = converter.convertTo(client);

            for(Address a: client.getAddresses())
                clientDTO.addAddress(converter.convertTo(a));

            return ResponseEntity.ok().body(clientDTO);

        } catch (Exception e){
            return ResponseEntity.badRequest().body(new ClientException("Erro " + e.getMessage()));
        }
    }
}

