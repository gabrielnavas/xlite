package api.posts.exception;

public class PostNotFoundException extends RuntimeException{
    public PostNotFoundException() {
        super("post not found");
    }
}
