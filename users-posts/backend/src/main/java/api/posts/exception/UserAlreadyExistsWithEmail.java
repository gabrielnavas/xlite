package api.posts.exception;

public class UserAlreadyExistsWithEmail extends RuntimeException {

    public UserAlreadyExistsWithEmail() {
        super("user already exists with email");
    }
}
