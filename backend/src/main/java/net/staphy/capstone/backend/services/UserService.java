package net.staphy.capstone.backend.services;

import net.staphy.capstone.backend.dtos.LoginDto;
import net.staphy.capstone.backend.dtos.LoginResponseDto;
import net.staphy.capstone.backend.entities.User;
import net.staphy.capstone.backend.repositories.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserService extends BaseService<User> implements UserDetailsService {

    private final UserRepository userRepository;
    public UserService(UserRepository repository) {
        super(repository);
        this.userRepository = repository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findFirstByEmail(username);
    }

    public LoginResponseDto login(LoginDto loginDto) {
        User user = (User) loadUserByUsername(loginDto.getEmail());
        return LoginResponseDto.builder().build();
    }
}
