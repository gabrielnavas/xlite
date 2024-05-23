package api.posts.controller;

import api.posts.dto.AuthResponseDTO;
import api.posts.dto.LoginRequestDTO;
import api.posts.infra.security.TokenService;
import api.posts.models.User;
import api.posts.repository.UserRepository;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@AllArgsConstructor
public class LoginController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@Valid @RequestBody LoginRequestDTO body) {
        User user = userRepository.findByEmail(body.email()).orElseThrow(() -> new RuntimeException("user not found"));
        if (passwordEncoder.matches(body.password(), user.getPassword())) {
            String token = tokenService.generateToken(user);
            return ResponseEntity.ok(new AuthResponseDTO(token));
        }
        return ResponseEntity.badRequest().build();
    }
}
