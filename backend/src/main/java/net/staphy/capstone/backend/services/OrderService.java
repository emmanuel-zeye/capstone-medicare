package net.staphy.capstone.backend.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import net.staphy.capstone.backend.entities.Address;
import net.staphy.capstone.backend.entities.Order;
import net.staphy.capstone.backend.entities.OrderItem;
import net.staphy.capstone.backend.entities.Payment;
import net.staphy.capstone.backend.entities.User;
import net.staphy.capstone.backend.repositories.AddressRepository;
import net.staphy.capstone.backend.repositories.OrderItemRepository;
import net.staphy.capstone.backend.repositories.OrderRepository;
import net.staphy.capstone.backend.repositories.PaymentRepository;
import net.staphy.capstone.backend.utils.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.function.ToDoubleFunction;
import java.util.stream.Collectors;

@Service
@Slf4j
public class OrderService extends BaseService<Order> {

    private final PaymentRepository paymentRepository;
    private final AddressRepository addressRepository;
    private final OrderItemRepository orderItemRepository;
    private final OrderRepository orderRepository;

    private final ObjectMapper objectMapper;

    public OrderService(OrderRepository repository,
                        PaymentRepository paymentRepository,
                        AddressRepository addressRepository,
                        OrderItemRepository orderItemRepository,
                        OrderRepository orderRepository, ObjectMapper objectMapper) {
        super(repository);
        this.paymentRepository = paymentRepository;
        this.addressRepository = addressRepository;
        this.orderItemRepository = orderItemRepository;
        this.orderRepository = orderRepository;
        this.objectMapper = objectMapper;
    }

    public ResponseEntity<String> checkout(String body) throws JsonProcessingException {
        User user = SecurityUtils.getAuthenticatedUserOrFail();
        Payment payment = objectMapper.readValue(body, Payment.class);
        Address address = objectMapper.readValue(body, Address.class);
        address.setUser(user);
        addressRepository.save(address);
        log.info("Payment and address {} - {}", payment, address);
        List<OrderItem> orderItems = orderItemRepository.findAllByUserAndOrderNull(user);
        double amount = orderItems.stream().map(orderItem -> orderItem.getProduct().getPrice().multiply(BigDecimal.valueOf(orderItem.getQuantity())).doubleValue()).mapToDouble(value -> value).sum();
        Order order = new Order();
        order.setUser(user);
        order.setStatus("paid");
        order = orderRepository.save(order);
        Order finalOrder = order;
        orderItems.forEach(item -> {
            item.setOrder(finalOrder);
            item.setPrice(item.getProduct().getPrice());
        });
        orderItemRepository.saveAll(orderItems);
        payment.setAmount(BigDecimal.valueOf(amount));
        payment.setOrder(order);
        paymentRepository.save(payment);
        return ResponseEntity.ok("");
    }
}
