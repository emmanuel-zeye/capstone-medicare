package net.staphy.capstone.backend.services;

import lombok.extern.slf4j.Slf4j;
import net.staphy.capstone.backend.dtos.LoginDto;
import net.staphy.capstone.backend.dtos.LoginResponseDto;
import net.staphy.capstone.backend.entities.User;
import net.staphy.capstone.backend.repositories.UserRepository;
import net.staphy.capstone.backend.utils.JwtUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class UserService extends BaseService<User> implements UserDetailsService {

    private final UserRepository userRepository;
    final
    PasswordEncoder passwordEncoder;

    public UserService(UserRepository repository, PasswordEncoder passwordEncoder) {
        super(repository);
        this.userRepository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findFirstByEmail(username);
    }

    @Override
    public ResponseEntity<User> create(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return super.create(user);
    }

    public LoginResponseDto login(LoginDto loginDto) {
        try {
            log.debug("Attempting login");
            User user = (User) loadUserByUsername(loginDto.getEmail());
            log.debug("Possible user: {}", user);
            boolean validPassword = user != null && passwordEncoder.matches(loginDto.getPassword(), user.getPassword());
            if(!validPassword) throw new IllegalArgumentException("invalid username or password");
            log.debug("Login successful. User {}", user);
            return LoginResponseDto.builder()
                    .token(JwtUtils.createToken(user, false))
                    .refreshToken(JwtUtils.createToken(user,true))
                    .build();
        } catch (Throwable e) {
            throw new RuntimeException(e);
        }
    }
}
