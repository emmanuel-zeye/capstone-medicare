package net.staphy.capstone.backend.services;

import net.staphy.capstone.backend.entities.OrderItem;
import net.staphy.capstone.backend.repositories.OrderItemRepository;
import org.springframework.stereotype.Service;

@Service
public class OrderItemService extends BaseService<OrderItem> {
    public OrderItemService(OrderItemRepository repository) {
        super(repository);
    }
}
