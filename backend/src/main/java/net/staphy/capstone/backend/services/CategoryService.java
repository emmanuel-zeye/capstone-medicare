package net.staphy.capstone.backend.services;

import net.staphy.capstone.backend.entities.Category;
import net.staphy.capstone.backend.repositories.CategoryRepository;
import org.springframework.stereotype.Service;

@Service
public class CategoryService extends BaseService<Category> {
    public CategoryService(CategoryRepository repository) {
        super(repository);
    }
}
