package api.posts.service;

import api.posts.models.Post;
import api.posts.models.User;

import java.util.List;

public interface PostService {
    Post createPost(User owner, String description);

    List<Post> getAllPostsByOwner(User user);
}
