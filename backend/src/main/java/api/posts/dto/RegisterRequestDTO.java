package api.posts.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterRequestDTO(

        @NotBlank
        @Size(min = 3, max = 100, message = "The length of full name must be between 3 and 100 characters.")
        @JsonProperty("full_name")
        String fullName,

        @NotBlank
        @Size(min = 3, max = 100, message = "The length of username must be between 3 and 100 characters.")
        String username,

        @NotBlank
        @Email
        String email,

        @NotBlank
        @Size(min = 6, max = 100, message = "The length of password must be between 6 and 100 characters.")
        String password) {
}
