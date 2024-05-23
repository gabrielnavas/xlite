package api.posts.service;

import api.posts.dto.RegisterRequestDTO;
import api.posts.exception.UserAlreadyExistsWithEmail;
import api.posts.exception.UserAlreadyExistsWithUsername;
import api.posts.models.Role;
import api.posts.models.User;
import api.posts.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class RegisterUserServiceImpl implements RegisterUserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public User registerUser(RegisterRequestDTO dto) {
        User user = makeUser(dto.fullName(), dto.username(), dto.email(), dto.password());
        user = userRepository.save(user);
        return user;
    }

    @Override
    public void registerUserAdmin(RegisterRequestDTO dto) {
        User user = makeUser(dto.fullName(), dto.username(), dto.email(), dto.password());
        user.setRoles(new HashSet<>(List.of(Role.USER, Role.ADMIN)));
        boolean userAlreadyExists = userRepository.findByEmail(dto.email()).isEmpty();
        if (userAlreadyExists) {
            userRepository.save(user);
        }
    }

    private User makeUser(String fullName, String username, String email, String password) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent()) {
            throw new UserAlreadyExistsWithEmail();
        }

        user = userRepository.findByUsername(username);
        if (user.isPresent()) {
            throw new UserAlreadyExistsWithUsername();
        }

        User newUser = new User();
        newUser.setPassword(passwordEncoder.encode(password));
        newUser.setEmail(email);
        newUser.setFullName(fullName);
        newUser.setUsername(username);
        newUser.setRoles(new HashSet<>(Collections.singletonList(Role.USER)));

        return newUser;
    }
}
