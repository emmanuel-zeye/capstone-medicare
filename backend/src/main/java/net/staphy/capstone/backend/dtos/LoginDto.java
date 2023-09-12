package net.staphy.capstone.backend.dtos;

import lombok.Data;

@Data
public class LoginDto {
    private String email;
    private String password;
}
