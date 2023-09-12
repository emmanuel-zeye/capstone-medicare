package net.staphy.capstone.backend.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.math.BigDecimal;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@Table(name = "order_items")
public class OrderItem extends BaseEntity {
    @OneToOne
    private Order order;
    @OneToOne
    private Product product;
    private int quantity;
    private BigDecimal price;
}
