package api.posts.service;

import api.posts.models.Post;
import api.posts.models.User;

import java.util.List;
import java.util.UUID;

public interface PostService {
    Post createPost(User owner, String description);

    List<Post> getAllPostsByOwner(User owner);
    List<Post> getAllPosts();
    void removePost(UUID id);
}
