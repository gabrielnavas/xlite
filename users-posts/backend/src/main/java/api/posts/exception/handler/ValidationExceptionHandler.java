package api.posts.exception.handler;

import api.posts.exception.models.ErrorResponse;
import api.posts.exception.models.ValidationErrorResponse;
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
    public ResponseEntity<ErrorResponse> handle(MethodArgumentNotValidException exception) {
        ErrorResponse errorResponse = new ErrorResponse();
        errorResponse.setMessage("validation failed");
        errorResponse.setDetails(getValidationErrorResponses(exception));

        return ResponseEntity.badRequest().body(errorResponse);
    }

    private List<ValidationErrorResponse> getValidationErrorResponses(MethodArgumentNotValidException exception) {
        List<ValidationErrorResponse> validationErrors = new ArrayList<>();
        exception.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            validationErrors.add(new ValidationErrorResponse(fieldName, errorMessage));
        });
        return validationErrors;
    }
}
