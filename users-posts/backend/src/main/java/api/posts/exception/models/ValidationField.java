package api.posts.exception.models;

import lombok.Data;

@Data
public class ValidationErrorResponse {
    private String field;
    private String description;

    public ValidationErrorResponse(String field, String description) {
        this.field = field;
        this.description = description;
    }
}
