package net.staphy.capstone.backend.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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
    @ManyToOne
    @JoinColumn(name = "order_id")
    @JsonBackReference
    private Order order;
    @ManyToOne
    private Product product;
    private int quantity;
    private BigDecimal price;
    @ManyToOne
    private User user;
}
