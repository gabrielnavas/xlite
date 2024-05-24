package api.posts.service;

import api.posts.models.Post;
import api.posts.models.User;
import api.posts.repository.PostRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@AllArgsConstructor
public class PostServiceImpl implements PostService {

    private PostRepository postRepository;

    @Override
    public Post createPost(User owner, String description) {
        Post post = new Post();
        post.setDescription(description);
        post.setOwner(owner);
        post.setCreatedAt(LocalDateTime.now());
        return postRepository.save(post);
    }
}
