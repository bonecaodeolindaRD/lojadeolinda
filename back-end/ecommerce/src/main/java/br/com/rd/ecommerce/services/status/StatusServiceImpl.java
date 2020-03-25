package br.com.rd.ecommerce.services.status;

import br.com.rd.ecommerce.converters.Converter;
import br.com.rd.ecommerce.models.dto.StatusDTO;
import br.com.rd.ecommerce.models.entities.Status;
import br.com.rd.ecommerce.repositories.StatusRepository;
import br.com.rd.ecommerce.services.exceptions.StatusException;
import org.hibernate.JDBCException;
import org.hibernate.exception.SQLGrammarException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.server.ResponseStatusException;

import javax.persistence.EntityNotFoundException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Service
public class StatusServiceImpl implements StatusService {
    @Autowired
    private StatusRepository statusRepository;
    private Converter converter = new Converter();



    @Override
    public ResponseEntity<?> createStatus(StatusDTO status) {
        if (status == null)
            return ResponseEntity.badRequest().body(new StatusException("Status is not be null"));
        Status stat = converter.convertTo(status);
        StatusDTO returnStatus = converter.convertTo(statusRepository.save(stat));
        return ResponseEntity.status(HttpStatus.CREATED).body(returnStatus);
    }

    @Override
    public ResponseEntity<?> findStatusById(Long id) {
        Status status = statusRepository.findByIdStatus(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Status not found"));

        StatusDTO statusDTO = converter.convertTo(status);
        return ResponseEntity.ok().body(statusDTO);

    }

    @Override
    public ResponseEntity<?> findAllStatus() {
        List<Status> list = statusRepository.findAll();
        if(list.size() <= 0)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        return ResponseEntity.status(HttpStatus.OK).body(list);
    }


    @Override
    public void deleteStatus(Long id) {
        statusRepository.deleteById(id);
    }

    @Override
    public ResponseEntity<?> updateStatus(Long id, StatusDTO status) {
        if (status == null)
            return ResponseEntity.badRequest().body(new StatusException("Informe um status"));

        Status s = statusRepository.findByIdStatus(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Status not found"));
        s.setStatus(status.getName());
        s.setIdStatus(status.getId());
        StatusDTO returnStatus = converter.convertTo(statusRepository.save(s));
        return ResponseEntity.ok().body(returnStatus);


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
