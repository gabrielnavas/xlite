package api.posts.controller;

import api.posts.infra.security.TokenService;
import api.posts.models.Role;
import api.posts.models.User;
import api.posts.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
@AllArgsConstructor
public class UserController {

    private final UserService userService;
    private final TokenService tokenService;

    @GetMapping
    public ResponseEntity<User> getUser(@RequestHeader("Authorization") String jwt) {
        String email = tokenService.validateTokenAndGetSubject(jwt);
        User user = userService.findUserByEmail(email);

        boolean isAdmin = user.getRoles().stream().anyMatch(role -> role.equals(Role.ADMIN));
        if (isAdmin) {
            throw new RuntimeException("you cant have this user");
        }

        return ResponseEntity.ok(user);
    }
}
