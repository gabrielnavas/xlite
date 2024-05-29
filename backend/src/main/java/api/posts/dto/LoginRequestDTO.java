package api.posts.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record LoginRequestDTO(

        @NotBlank
        @Email
        String email,

        @NotBlank
        @Size(min = 6, max = 100, message = "The length of password must be between 6 and 100 characters.")
        String password) {
}
