package api.posts.service;

import api.posts.exception.PostNotFoundException;
import api.posts.models.Post;
import api.posts.models.User;
import api.posts.repository.PostRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

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

    @Override
    public List<Post> getAllPostsByOwner(User owner) {
        return postRepository.findByOwnerIdOrderByCreatedAtDesc(owner.getId());
    }

    @Override
    public List<Post> getAllPosts() {
        return postRepository.findAllByOrderByCreatedAtDesc();
    }

    @Override
    public void removePost(UUID id) {
        Optional<Post> optionalPost = postRepository.findById(id);
        if(optionalPost.isEmpty()) {
            throw new PostNotFoundException();
        }
        postRepository.deleteById(id);
    }
}
