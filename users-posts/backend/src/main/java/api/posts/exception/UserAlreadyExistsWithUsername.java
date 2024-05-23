package api.posts.exception;

public class UserAlreadyExistsWithUsername extends RuntimeException {

    public UserAlreadyExistsWithUsername() {
        super("user already exists with username");
    }
}
