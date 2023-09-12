package net.staphy.capstone.backend.services;

import net.staphy.capstone.backend.entities.Order;
import net.staphy.capstone.backend.repositories.OrderRepository;
import org.springframework.stereotype.Service;

@Service
public class OrderService extends BaseService<Order> {
    public OrderService(OrderRepository repository) {
        super(repository);
    }
}
