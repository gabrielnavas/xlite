package api.posts.controller;

import api.posts.dto.AuthResponseDTO;
import api.posts.dto.LoginRequestDTO;
import api.posts.models.User;
import api.posts.service.LoginService;
import api.posts.service.UserService;
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
public class LoginController {

    private final LoginService loginService;
    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@Valid @RequestBody LoginRequestDTO body) {
        String token = loginService.generateToken(body.email(), body.password());
        User user = userService.findUserByEmail(body.email());
        return ResponseEntity.ok(AuthResponseDTO.to(token, user));
    }
}
