package api.posts.exception;

public class UserAlreadyExistsWithEmailException extends RuntimeException {

    public UserAlreadyExistsWithEmailException() {
        super("user already exists with email");
    }
}
