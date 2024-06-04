package api.posts.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UpdatePartialPostRequestDTO(
        @NotBlank
        @Size(min = 2, max = 100, message = "The length of description must be between 2 and 255 characters.")
        String description
) {
}
