package api.posts.dto;

import api.posts.models.User;

public record AuthResponseDTO(String token, UseResponseDTO user) {

    public static AuthResponseDTO to(String token, User user) {
        return new AuthResponseDTO(
                token,
                UseResponseDTO.to(user)
        );
    }
}
