package api.posts.service;

import api.posts.dto.RegisterRequestDTO;
import api.posts.models.User;

public interface RegisterUserService {
    User registerUser(RegisterRequestDTO dto);

    User registerUserAdmin(RegisterRequestDTO dto);
}
