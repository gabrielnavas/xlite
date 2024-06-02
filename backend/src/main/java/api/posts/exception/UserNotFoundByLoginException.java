package api.posts.exception;

public class UserNotFoundByLoginException extends RuntimeException {
    public UserNotFoundByLoginException() {
        super("email or password is incorrect");
    }
}