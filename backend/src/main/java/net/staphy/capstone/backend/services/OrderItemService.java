package net.staphy.capstone.backend.services;

import net.staphy.capstone.backend.entities.OrderItem;
import net.staphy.capstone.backend.repositories.OrderItemRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

@Service
public class OrderItemService extends BaseService<OrderItem> {

    OrderItemRepository orderItemRepository;

    public OrderItemService(OrderItemRepository repository) {
        super(repository);
        this.orderItemRepository = repository;
    }

    @Override
    public ResponseEntity<OrderItem> create(OrderItem orderItem) {
        OrderItem existingItem = orderItemRepository.findFirstByProduct(orderItem.getProduct());
        if(!ObjectUtils.isEmpty(existingItem)) {
            existingItem.setQuantity(existingItem.getQuantity()+orderItem.getQuantity());
            existingItem = orderItemRepository.save(existingItem);
        }
        else {
            existingItem = orderItemRepository.save(orderItem);
        }
        if(existingItem.getQuantity() == 0) {
            orderItemRepository.delete(existingItem);
        }
        return ResponseEntity.ok(existingItem);
    }

//    @Override
//    public ResponseEntity<List<OrderItem>> findAll() {
//
//    }
//
//    @Override
//    public ResponseEntity<Page<OrderItem>> findAll(Pager pager) {
//
//    }
}
