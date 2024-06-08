package api.posts.service;

import api.posts.exception.PostAlreadyHasImagesException;
import api.posts.exception.PostImageNotFoundException;
import api.posts.exception.PostNotFoundException;
import api.posts.models.Post;
import api.posts.models.PostImage;
import api.posts.models.User;
import api.posts.repository.PostImageRepository;
import api.posts.repository.PostRepository;
import lombok.AllArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
@Transactional
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private final PostImageRepository postImageRepository;
    private final StorageService storageService;

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
        if (optionalPost.isEmpty()) {
            throw new PostNotFoundException();
        }
        Post post = optionalPost.get();
        post.getPostImages().forEach(postImage -> storageService.delete(postImage.getName()));
        postImageRepository.deleteAllByPostId(post.getId());
        postRepository.deleteById(post.getId());
    }

    @Override
    public void updatePartialPost(UUID id, String description) {
        Optional<Post> optionalPost = postRepository.findById(id);
        if (optionalPost.isEmpty()) {
            throw new PostNotFoundException();
        }
        Post post = optionalPost.get();
        post.setDescription(description);
        postRepository.save(post);
    }

    @Override
    public Post storeImages(UUID postId, List<MultipartFile> images) {
        Optional<Post> optionalPost = postRepository.findById(postId);
        if (optionalPost.isEmpty()) {
            throw new PostNotFoundException();
        }

        Post post = optionalPost.get();
        if (!post.getPostImages().isEmpty()) {
            throw new PostAlreadyHasImagesException();
        }

        storageService.init();
        images.forEach(image -> {
            PostImage postImage = new PostImage();
            postImage.setName(generatePostImageName(post, image.getOriginalFilename()));
            postImage.setPost(post);
            storageService.store(image, postImage.getName());
            postImage = postImageRepository.save(postImage);
            post.getPostImages().add(postImage);
        });

        return post;
    }

    @Override
    public Resource loadImage(UUID postId, String imageName) {
        Optional<Post> optionalPost = postRepository.findById(postId);
        if (optionalPost.isEmpty()) {
            throw new PostNotFoundException();
        }
        Post post = optionalPost.get();
        boolean imageExists = post.getPostImages().stream().anyMatch(postImage -> postImage.getName().equals(imageName));
        if (!imageExists) {
            throw new PostImageNotFoundException();
        }
        return storageService.loadAsResource(imageName);
    }

    private String generatePostImageName(Post post, String imageName) {
        final String secondsName = imageName == null || imageName.isBlank()
                ? UUID.randomUUID().toString()
                : imageName;
        return String.format("%s:%s", post.getId(), secondsName);
    }
}
