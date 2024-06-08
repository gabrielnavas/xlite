package api.posts.exception;

public class PostAlreadyHasImagesException extends RuntimeException {
    public PostAlreadyHasImagesException() {
        super("Post already has images");
    }
}
