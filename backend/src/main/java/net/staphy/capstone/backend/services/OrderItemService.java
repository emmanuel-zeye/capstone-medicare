package net.staphy.capstone.backend.services;

import net.staphy.capstone.backend.dtos.Pager;
import net.staphy.capstone.backend.entities.OrderItem;
import net.staphy.capstone.backend.entities.User;
import net.staphy.capstone.backend.repositories.OrderItemRepository;
import net.staphy.capstone.backend.utils.SecurityUtils;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.util.List;

@Service
public class OrderItemService extends BaseService<OrderItem> {

    OrderItemRepository orderItemRepository;

    public OrderItemService(OrderItemRepository repository) {
        super(repository);
        this.orderItemRepository = repository;
    }

    @Override
    public ResponseEntity<List<OrderItem>> findAll() {
        User user = SecurityUtils.getAuthenticatedUserOrFail();
        return ResponseEntity.ok()
                .body(orderItemRepository.findAllByUserAndOrderNull(user));    }

    @Override
    public ResponseEntity<Page<OrderItem>> findAll(Pager pager) {
        User user = SecurityUtils.getAuthenticatedUserOrFail();
        return ResponseEntity.ok()
                .body(orderItemRepository.findAllByUserAndOrderNull(user, getPageRequest(pager)));
    }

    @Override
    public ResponseEntity<OrderItem> create(OrderItem orderItem) {
        User user = SecurityUtils.getAuthenticatedUserOrFail();
        orderItem.setUser(user);
        OrderItem existingItem = orderItemRepository.findFirstByProductAndOrderNull(orderItem.getProduct());
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
