package api.posts.service;

import api.posts.models.User;

public interface UserService {
    User findUserByEmail(String email);
}
