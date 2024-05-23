package api.posts.exception.handler;

import api.posts.exception.UserAlreadyExistsWithEmail;
import api.posts.exception.UserAlreadyExistsWithUsername;
import api.posts.exception.response.Message;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class AuthExceptionHandler {

    @ExceptionHandler({
            UserAlreadyExistsWithUsername.class,
            UserAlreadyExistsWithEmail.class
    })
    public ResponseEntity<Message> handle(RuntimeException ex) {
        Message message = new Message();
        message.setMessage(ex.getMessage());
        return ResponseEntity.badRequest().body(message);
    }
}
