package api.posts.service;

public interface LoginService {
    String generateToken(String email, String password);
}
