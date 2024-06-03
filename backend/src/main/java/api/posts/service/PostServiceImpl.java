package api.posts.service;

import api.posts.exception.PostNotFoundException;
import api.posts.models.Post;
import api.posts.models.PostImage;
import api.posts.models.User;
import api.posts.repository.PostImageRepository;
import api.posts.repository.PostRepository;
import lombok.AllArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.*;

import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
@Transactional
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private final PostImageRepository postImageRepository;
    private final FileSystemStorageService fileSystemStorageService;

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

    @Override
    public Post storeImage(UUID postId, MultipartFile file) {
        Optional<Post> optionalPost = postRepository.findById(postId);
        if(optionalPost.isEmpty()) {
            throw new PostNotFoundException();
        }

        fileSystemStorageService.store(file);

        Post post = optionalPost.get();
        PostImage postImage = new PostImage();
        postImage.setName(file.getOriginalFilename());

        postImage = postImageRepository.save(postImage);
        post.getPostImages().add(postImage);

        return post;
    }

    @Override
    public Resource loadImage(String imageName) {
        return fileSystemStorageService.loadAsResource(imageName);
    }
}
