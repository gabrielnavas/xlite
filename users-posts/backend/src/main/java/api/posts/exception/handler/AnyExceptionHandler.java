package api.posts.exception.handler;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ServerErrorExceptionHandler {


    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handle(Exception exception) {
        return ResponseEntity.internalServerError().body("server error");
    }
}
