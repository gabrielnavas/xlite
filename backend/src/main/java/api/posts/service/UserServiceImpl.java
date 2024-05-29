package api.posts.service;

import api.posts.exception.UserNotFoundByLogin;
import api.posts.models.User;
import api.posts.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    @Override
    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow(UserNotFoundByLogin::new);
    }
}
