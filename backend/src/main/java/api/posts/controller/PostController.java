package api.posts.controller;

import api.posts.dto.CreatePostRequestDTO;
import api.posts.dto.PostResponseDTO;
import api.posts.infra.security.TokenService;
import api.posts.models.Post;
import api.posts.models.User;
import api.posts.service.PostService;
import api.posts.service.UserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/post")
@AllArgsConstructor
public class PostController {

    private final TokenService tokenService;
    private final UserService userService;
    private final PostService postService;

    @PostMapping
    public ResponseEntity<PostResponseDTO> createPost(
            @Valid @RequestBody CreatePostRequestDTO postDto,
            @RequestHeader("Authorization") String authorization
    ) {
        String email = tokenService.validateTokenAndGetSubject(authorization);
        User user = userService.findUserByEmail(email);
        Post post = postService.createPost(user, postDto.description());
        PostResponseDTO responseDto = PostResponseDTO.from(post);
        return ResponseEntity.status(HttpStatus.CREATED).body(responseDto);
    }

    @GetMapping("/owner")
    public ResponseEntity<List<PostResponseDTO>> getPostsByOwner(
            @RequestHeader("Authorization") String authorization
    ) {
        String email = tokenService.validateTokenAndGetSubject(authorization);
        User user = userService.findUserByEmail(email);
        List<Post> posts = postService.getAllPostsByOwner(user);
        List<PostResponseDTO> responseDto = PostResponseDTO.from(posts);
        return ResponseEntity.ok().body(responseDto);
    }

    @GetMapping
    public ResponseEntity<List<PostResponseDTO>> getPosts(
            @RequestHeader("Authorization") String authorization
    ) {
        List<Post> posts = postService.getAllPosts();
        List<PostResponseDTO> responseDto = PostResponseDTO.from(posts);
        return ResponseEntity.ok().body(responseDto);
    }
}
