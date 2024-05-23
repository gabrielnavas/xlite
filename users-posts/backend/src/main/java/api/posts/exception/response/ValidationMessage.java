package api.posts.exception.response;

import lombok.Data;

import java.util.List;

@Data
public class ValidationMessage {
    private String message;
    private List<ValidationField> details;
}
