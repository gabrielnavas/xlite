package api.posts.exception.response;

import lombok.Data;

@Data
public class ValidationField {
    private String field;
    private String description;

    public ValidationField(String field, String description) {
        this.field = field;
        this.description = description;
    }
}
