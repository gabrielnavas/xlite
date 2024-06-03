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
    Post storeImage(UUID postId, MultipartFile file);
    Resource loadImage(String imageName);
}
