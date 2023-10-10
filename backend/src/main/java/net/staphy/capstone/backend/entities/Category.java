package net.staphy.capstone.backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@Table(name = "categories")
@NoArgsConstructor
public class Category extends BaseEntity {

    public Category(String id) {
        setId(Long.parseLong(id));
    }

    private String name;
    @ManyToMany
    @JsonIgnore
    private List<Product> products;
}
