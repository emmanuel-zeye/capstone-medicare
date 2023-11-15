package net.staphy.capstone.backend.configs;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import net.staphy.capstone.backend.entities.User;
import net.staphy.capstone.backend.utils.JwtUtils;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.io.IOException;

public class JwtFilter implements Filter {
    private final ObjectMapper objectMapper;

    public JwtFilter(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest httpServletRequest = (HttpServletRequest)servletRequest;
        String token = httpServletRequest.getHeader("Authorization");
        token = token == null ? "" : token.trim().substring(7);
        Claims claims = JwtUtils.validateToken(token);
        if(claims != null) {
            Object userObject = claims.get("user");
            User user = objectMapper.convertValue(userObject, User.class);
            Authentication authentication = new UsernamePasswordAuthenticationToken(user, token, null);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        filterChain.doFilter(servletRequest,servletResponse);
    }
}
