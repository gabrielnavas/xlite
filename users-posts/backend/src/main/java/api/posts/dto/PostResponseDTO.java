package api.posts.dto;

import api.posts.models.Post;
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
        String ownerUsername
) {

    public static PostResponseDTO from(Post post) {
        return new PostResponseDTO(
                post.getId(),
                post.getDescription(),
                post.getCreatedAt(),
                post.getOwner().getId(),
                "",
                post.getOwner().getFullName(),
                post.getOwner().getUsername()
        );
    }

    public static List<PostResponseDTO> from(List<Post> post) {
        return post.stream().map(PostResponseDTO::from).toList();
    }
}
