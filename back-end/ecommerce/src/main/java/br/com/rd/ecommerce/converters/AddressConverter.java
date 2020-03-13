package br.com.rd.ecommerce.converters;

import br.com.rd.ecommerce.models.dto.AddressDTO;
import br.com.rd.ecommerce.models.entities.Address;

public interface AddressConverter {
    Address DTOToAddress(AddressDTO addressDTO);
    AddressDTO addressToAddressDTO(Address address);
}
