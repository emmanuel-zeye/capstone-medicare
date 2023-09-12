package net.staphy.capstone.backend.controllers;

import net.staphy.capstone.backend.dtos.LoginDto;
import net.staphy.capstone.backend.dtos.LoginResponseDto;
import net.staphy.capstone.backend.entities.User;
import net.staphy.capstone.backend.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("users")
@RestController
public class UserController extends BaseController<User> {

    private UserService service;
    public UserController(UserService service) {
        super(service);
        this.service = service;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@RequestBody LoginDto loginDto) {
return ResponseEntity.ok().body(service.login(loginDto));
    }
}
