package api.posts.service;

import api.posts.models.Post;
import api.posts.models.User;

public interface PostService {
    Post createPost(User owner, String description);
}
