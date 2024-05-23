package api.posts.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterRequestDTO(

        @NotBlank
        @Size(min = 3, max = 100, message = "The length of name must be between 3 and 100 characters.")
        String name,

        @NotBlank
        @Size(min = 6, max = 100, message = "The length of username must be between 6 and 100 characters.")
        String username,

        @NotBlank
        @Email
        String email,

        @NotBlank
        @Size(min = 6, max = 100, message = "The length of password must be between 6 and 100 characters.")
        String password) {
}
