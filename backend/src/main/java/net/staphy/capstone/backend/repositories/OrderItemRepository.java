package net.staphy.capstone.backend.repositories;

import net.staphy.capstone.backend.entities.OrderItem;
import net.staphy.capstone.backend.entities.Product;
import net.staphy.capstone.backend.entities.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    OrderItem findFirstByProductAndOrderNull(Product product);

    Page<OrderItem> findAllByUserAndOrderNull(User user, Pageable pageRequest);

    List<OrderItem> findAllByUserAndOrderNull(User user);
}
