package api.posts.dto;

import api.posts.models.Role;
import api.posts.models.User;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDateTime;
import java.util.Set;

public record UseResponseDTO(
        @JsonProperty("created_at")
        LocalDateTime createdAt,

        @JsonProperty("full_name")
        String fullName,
        String username,
        String email,
        Set<Role> roles
) {
    public static UseResponseDTO to(User user) {
        return new UseResponseDTO(
                user.getCreatedAt(),
                user.getFullName(),
                user.getUsername(),
                user.getEmail(),
                user.getRoles()
        );
    }
}
