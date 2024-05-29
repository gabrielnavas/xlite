package api.posts.exception;

public class UserNotFoundByLogin extends RuntimeException {
    public UserNotFoundByLogin() {
        super("email or password is incorrect");
    }
}