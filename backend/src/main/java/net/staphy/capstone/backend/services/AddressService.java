package net.staphy.capstone.backend.services;

import net.staphy.capstone.backend.entities.Address;
import net.staphy.capstone.backend.repositories.AddressRepository;
import org.springframework.stereotype.Service;

@Service
public class AddressService extends BaseService<Address> {
    public AddressService(AddressRepository repository) {
        super(repository);
    }
}
