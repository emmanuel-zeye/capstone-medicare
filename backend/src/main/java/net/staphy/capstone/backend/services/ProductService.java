package net.staphy.capstone.backend.services;

import net.staphy.capstone.backend.entities.Product;
import net.staphy.capstone.backend.repositories.ProductRepository;
import org.springframework.stereotype.Service;

@Service
public class ProductService extends BaseService<Product> {
    public ProductService(ProductRepository repository) {
        super(repository);
    }
}
