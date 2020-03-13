package br.com.rd.ecommerce.converters;

import br.com.rd.ecommerce.models.dto.ClientDTO;
import br.com.rd.ecommerce.models.entities.Client;

public interface ClientConverter {
    Client DTOToClient(ClientDTO clientDTO);
    ClientDTO clientToClientDTO(Client client);
}
