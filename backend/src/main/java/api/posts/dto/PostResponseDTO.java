package api.posts.dto;

import api.posts.models.Post;
import api.posts.models.PostImage;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDateTime;
import java.util.List;

public record PostResponseDTO(
        @JsonProperty("post_id")
        String id,

        String description,

        @JsonProperty("created_at")
        LocalDateTime createdAt,

        @JsonProperty("owner_id")
        String ownerId,

        @JsonProperty("owner_avatar_url")
        String ownerAvatarUrl,

        @JsonProperty("owner_full_name")
        String ownerFullName,

        @JsonProperty("owner_username")
        String ownerUsername,

        @JsonProperty("image_names")
        List<String> imageNames
) {

    public static PostResponseDTO to(Post post) {
        return new PostResponseDTO(
                post.getId().toString(),
                post.getDescription(),
                post.getCreatedAt(),
                post.getOwner().getId().toString(),
                "",
                post.getOwner().getFullName(),
                post.getOwner().getUsername(),
                post.getPostImages().stream().map(PostImage::getName).toList()
        );
    }

    public static List<PostResponseDTO> to(List<Post> post) {
        return post.stream().map(PostResponseDTO::to).toList();
    }
}
