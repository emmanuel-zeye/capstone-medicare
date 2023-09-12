package net.staphy.capstone.backend.controllers;

import net.staphy.capstone.backend.entities.Payment;
import net.staphy.capstone.backend.services.PaymentService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("payments")
@RestController
public class PaymentController extends BaseController<Payment> {
    public PaymentController(PaymentService service) {
        super(service);
    }
}
