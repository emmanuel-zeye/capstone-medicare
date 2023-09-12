package net.staphy.capstone.backend.controllers;

import net.staphy.capstone.backend.entities.Order;
import net.staphy.capstone.backend.services.OrderService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("orders")
@RestController
public class OrderController extends BaseController<Order> {
    public OrderController(OrderService service) {
        super(service);
    }
}
