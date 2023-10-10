package net.staphy.capstone.backend.controllers;

import net.staphy.capstone.backend.entities.Category;
import net.staphy.capstone.backend.services.CategoryService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("product-categories")
@RestController
public class CategoryController extends BaseController<Category> {
    public CategoryController(CategoryService service) {
        super(service);
    }
}
