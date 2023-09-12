package net.staphy.capstone.backend.services;

import net.staphy.capstone.backend.entities.Payment;
import net.staphy.capstone.backend.repositories.PaymentRepository;
import org.springframework.stereotype.Service;

@Service
public class PaymentService extends BaseService<Payment> {
    public PaymentService(PaymentRepository repository) {
        super(repository);
    }
}
