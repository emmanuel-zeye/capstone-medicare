package net.staphy.capstone.backend.configs;

import net.staphy.capstone.backend.entities.BaseEntity;
import net.staphy.capstone.backend.entities.User;
import net.staphy.capstone.backend.enums.UserType;
import net.staphy.capstone.backend.repositories.UserRepository;
import net.staphy.capstone.backend.utils.SecurityUtils;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

@Configuration
public class BeanGenerators {

    @Bean
    public PasswordEncoder getPasswordEncoder() {
        return new BCryptPasswordEncoder(12);
    }

    @Bean
    public CommandLineRunner initAdminUser(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            if (userRepository.findAllByUserType(UserType.admin).isEmpty()) {
                userRepository.save(User.builder()
                        .email("admin@mail.com")
                        .password(passwordEncoder.encode("admin"))
                        .firstName("admin")
                        .lastName("admin")
                        .userType(UserType.admin)
                        .build());
            }
        };
    }

    @Bean
    public AuditorAware<String> auditorAwareRef() {
        return () -> {
            User user = SecurityUtils.getAuthenticatedUser();
            String id = Optional.ofNullable(user).map(u->String.format("%s-%s", u.getId(), u.getEmail())).orElse("system");
            return Optional.of(id);
        };
    }
}