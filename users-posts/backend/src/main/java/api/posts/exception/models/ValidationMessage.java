package api.posts.exception.models;

import lombok.Data;

import java.util.List;

@Data
public class ErrorResponse {
    private String message;
    private List<ValidationErrorResponse> details;
}
