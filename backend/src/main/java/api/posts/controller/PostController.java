package api.posts.controller;

import api.posts.dto.CreatePostRequestDTO;
import api.posts.dto.PostResponseDTO;
import api.posts.dto.UpdatePartialPostRequestDTO;
import api.posts.infra.security.TokenService;
import api.posts.models.Post;
import api.posts.models.User;
import api.posts.service.PostService;
import api.posts.service.UserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

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
        PostResponseDTO responseDto = PostResponseDTO.to(post);
        return ResponseEntity.status(HttpStatus.CREATED).body(responseDto);
    }

    @GetMapping("/owner")
    public ResponseEntity<List<PostResponseDTO>> fetchPostsByOwner(
            @RequestHeader("Authorization") String authorization
    ) {
        String email = tokenService.validateTokenAndGetSubject(authorization);
        User user = userService.findUserByEmail(email);
        List<Post> posts = postService.getAllPostsByOwner(user);
        List<PostResponseDTO> responseDto = PostResponseDTO.to(posts);
        return ResponseEntity.ok().body(responseDto);
    }

    @GetMapping
    public ResponseEntity<List<PostResponseDTO>> fetchPosts(
            @RequestHeader("Authorization") String authorization
    ) {
        List<Post> posts = postService.getAllPosts();
        List<PostResponseDTO> responseDto = PostResponseDTO.to(posts);
        return ResponseEntity.ok().body(responseDto);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<List<PostResponseDTO>> updatePost(
            @RequestHeader("Authorization") String authorization,
            @PathVariable("id") UUID postId,
            @RequestBody UpdatePartialPostRequestDTO updatePartialPostRequestDTO
    ) {
        postService.updatePartialPost(postId, updatePartialPostRequestDTO.description());
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<List<PostResponseDTO>> removePost(
            @RequestHeader("Authorization") String authorization,
            @PathVariable("id") UUID postId
    ) {
        postService.removePost(postId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/images")
    public ResponseEntity<PostResponseDTO> uploadImage(
            @PathVariable("id") UUID postId,
            @RequestParam("files") List<MultipartFile> files
    ) {
        Post post = postService.storeImages(postId, files);
        PostResponseDTO postResponseDTO = PostResponseDTO.to(post);
        return ResponseEntity.ok().body(postResponseDTO);
    }

    @GetMapping("/{id}/images/{filename}")
    public ResponseEntity<Resource> downloadImage(
            @PathVariable("id") UUID postId,
            @PathVariable String filename
    ) {
        Resource file = postService.loadImage(postId, filename);
        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename=\"" + file.getFilename() + "\"").body(file);
    }
}
