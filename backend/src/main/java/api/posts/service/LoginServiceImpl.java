package api.posts.service;

import api.posts.exception.UserNotFoundByLoginException;
import api.posts.infra.security.TokenService;
import api.posts.models.User;
import api.posts.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class LoginServiceImpl implements LoginService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    @Override
    public String generateToken(String email, String password) {
        User user = userRepository.findByEmail(email).orElseThrow(UserNotFoundByLoginException::new);
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new UserNotFoundByLoginException();
        }
        return tokenService.generateToken(user);
    }
}
