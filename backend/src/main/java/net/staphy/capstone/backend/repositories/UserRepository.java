package net.staphy.capstone.backend.repositories;

import net.staphy.capstone.backend.entities.User;
import net.staphy.capstone.backend.enums.UserType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    UserDetails findFirstByEmail(String username);

    List<User> findAllByUserType(UserType userType);
}
