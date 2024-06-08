package api.posts.exception;

public class PostImageNotFoundException extends RuntimeException {
    public PostImageNotFoundException() {
        super("Post image not found.");
    }
}
