package net.staphy.capstone.backend.controllers;

import net.staphy.capstone.backend.entities.OrderItem;
import net.staphy.capstone.backend.services.OrderItemService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("order-items")
@RestController
public class OrderItemController extends BaseController<OrderItem> {
    public OrderItemController(OrderItemService service) {
        super(service);
    }
}
