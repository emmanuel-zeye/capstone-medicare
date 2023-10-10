package net.staphy.capstone.backend.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class LoginDto {
    @NotNull @NotBlank @Email
    private String email;
    @NotBlank @NotNull
    private String password;
}
