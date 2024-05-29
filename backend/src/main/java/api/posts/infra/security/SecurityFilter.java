package api.posts.infra.security;

import api.posts.models.User;
import api.posts.service.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
@AllArgsConstructor
public class SecurityFilter extends OncePerRequestFilter {

    private final UserService userService;
    private final TokenService tokenService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String token = recoveryToken(request);
        String login = tokenService.validateTokenAndGetSubject(token);

        if (login != null) {
            User user = userService.findUserByEmail(login);
            List<SimpleGrantedAuthority> authorities = user.getRoles()
                    .stream()
                    .map(role -> {
                        String roleFull = "ROLE_" + role.name(); // example: "ROLE_ADMIN";
                        return new SimpleGrantedAuthority(roleFull);
                    })
                    .toList();

            var authentication = new UsernamePasswordAuthenticationToken(user, null, authorities);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        filterChain.doFilter(request, response);
    }

    private String recoveryToken(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null) {
            return null;
        }
        return authHeader.replace("Bearer ", "");
    }
}
