package api.posts.exception.handler;

import api.posts.exception.response.ValidationField;
import api.posts.exception.response.ValidationMessage;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.ArrayList;
import java.util.List;

@ControllerAdvice
public class ValidationExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ValidationMessage> handle(MethodArgumentNotValidException exception) {
        ValidationMessage validationMessage = new ValidationMessage();
        validationMessage.setMessage("validation failed");
        validationMessage.setDetails(getValidationErrorResponses(exception));

        return ResponseEntity.badRequest().body(validationMessage);
    }

    private List<ValidationField> getValidationErrorResponses(MethodArgumentNotValidException exception) {
        List<ValidationField> validationErrors = new ArrayList<>();
        exception.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            validationErrors.add(new ValidationField(fieldName, errorMessage));
        });
        return validationErrors;
    }
}
