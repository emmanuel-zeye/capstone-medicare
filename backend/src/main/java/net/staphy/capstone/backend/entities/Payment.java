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
@Table(name = "payments")
public class Payment extends BaseEntity {
    @OneToOne
    private Order order;
    private BigDecimal amount;
    private String paymentChannel;
}
