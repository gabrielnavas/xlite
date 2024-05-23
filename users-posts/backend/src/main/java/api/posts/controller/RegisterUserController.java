package api.posts.controller;

import api.posts.dto.AuthResponseDTO;
import api.posts.dto.RegisterRequestDTO;
import api.posts.infra.security.TokenService;
import api.posts.models.User;
import api.posts.service.RegisterUserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@AllArgsConstructor
public class RegisterUserController {

    private final RegisterUserService registerUserService;
    private final TokenService tokenService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponseDTO> register(@Valid @RequestBody RegisterRequestDTO body) {
        User user = registerUserService.registerUser(body);
        String token = tokenService.generateToken(user);
        return ResponseEntity.ok(new AuthResponseDTO(token));
    }
}
