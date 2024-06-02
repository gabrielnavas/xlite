package api.posts.exception;

public class UserAlreadyExistsWithUsernameException extends RuntimeException {

    public UserAlreadyExistsWithUsernameException() {
        super("user already exists with username");
    }
}
