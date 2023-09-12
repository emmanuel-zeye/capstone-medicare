package net.staphy.capstone.backend.controllers;

import net.staphy.capstone.backend.entities.Product;
import net.staphy.capstone.backend.services.ProductService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("products")
@RestController
public class ProductController extends BaseController<Product> {
    public ProductController(ProductService service) {
        super(service);
    }
}
