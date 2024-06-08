package api.posts.service;

import api.posts.models.Post;
import api.posts.models.User;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;
import org.springframework.core.io.Resource;

public interface PostService {
    Post createPost(User owner, String description);

    List<Post> getAllPostsByOwner(User owner);
    List<Post> getAllPosts();
    void removePost(UUID id);
    void updatePartialPost(UUID id, String description);
    Post storeImages(UUID postId, List<MultipartFile> files);
    Resource loadImage(UUID postId, String imageName);
}
