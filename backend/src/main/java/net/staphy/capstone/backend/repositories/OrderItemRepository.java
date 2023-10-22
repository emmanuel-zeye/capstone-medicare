package net.staphy.capstone.backend.repositories;

import net.staphy.capstone.backend.entities.OrderItem;
import net.staphy.capstone.backend.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    OrderItem findFirstByProduct(Product product);
}
