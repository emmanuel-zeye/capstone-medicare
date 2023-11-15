package net.staphy.capstone.backend.utils;

import net.staphy.capstone.backend.entities.User;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.client.HttpClientErrorException;

public class SecurityUtils {

    public static User getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(authentication != null) {
            return (User) authentication.getPrincipal();
        }
        return null;
    }

    public static User getAuthenticatedUserOrFail() {
        User user = getAuthenticatedUser();
        if(ObjectUtils.isEmpty(user)) {
            throw new HttpClientErrorException(HttpStatus.UNAUTHORIZED);
        }
        return user;
    }
}
