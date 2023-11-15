package net.staphy.capstone.backend.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import net.staphy.capstone.backend.entities.Address;
import net.staphy.capstone.backend.entities.Order;
import net.staphy.capstone.backend.entities.Payment;
import net.staphy.capstone.backend.services.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("orders")
@RestController
public class OrderController extends BaseController<Order> {
    private final OrderService orderService;
    public OrderController(OrderService service) {
        super(service);
        this.orderService = service;
    }

    @PostMapping("/checkout")
    public ResponseEntity<String> checkout(@RequestBody String body) throws JsonProcessingException {
        return orderService.checkout(body);
    }
}
