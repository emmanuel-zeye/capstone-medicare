package net.staphy.capstone.backend.controllers;

import net.staphy.capstone.backend.entities.Address;
import net.staphy.capstone.backend.services.AddressService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("addresses")
@RestController
public class AddressController extends BaseController<Address> {
    public AddressController(AddressService service) {
        super(service);
    }
}
