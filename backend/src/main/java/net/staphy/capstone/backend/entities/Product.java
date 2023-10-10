package net.staphy.capstone.backend.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.math.BigDecimal;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@Table(name = "products")
public class Product extends BaseEntity {
    @ManyToMany
    private List<Category> categories;
    private String name;
    private String description;
    private int quantity;
    private BigDecimal price;
    private String imageUrl;
}
