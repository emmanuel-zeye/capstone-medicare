package net.staphy.capstone.backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.*;
import net.staphy.capstone.backend.enums.UserType;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

@EqualsAndHashCode(callSuper = true)
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "users")
@Table(name = "users")
public class User extends BaseEntity implements UserDetails {
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String password;
    @Builder.Default
    private boolean enabled=true;
    @Builder.Default
    private UserType userType = UserType.customer;

    @Override
    @Transient
    @JsonIgnore
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority(userType.name()));
    }


    @Override
    @Transient
    @JsonIgnore
    public String getUsername() {
        return getEmail();
    }

    @Override
    @Transient
    @JsonIgnore
    public boolean isAccountNonExpired() {
        return isEnabled();
    }

    @Override
    @Transient
    @JsonIgnore
    public boolean isAccountNonLocked() {
        return isEnabled();
    }

    @Override
    @Transient
    @JsonIgnore
    public boolean isCredentialsNonExpired() {
        return isEnabled();
    }

}
