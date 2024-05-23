package api.posts.exception.handler;

import api.posts.exception.response.Message;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class TokenExceptionHandler {

    @ExceptionHandler(JWTVerificationException.class)
    public ResponseEntity<Message> handlerVerificationToken(JWTVerificationException ex) {
        Message message = new Message();
        message.setMessage("token is not valid");
        return ResponseEntity.badRequest().body(message);
    }

    @ExceptionHandler(JWTCreationException.class)
    public ResponseEntity<Message> handlerCreateToken(JWTCreationException ex) {
        Message message = new Message();
        message.setMessage("try again later");
        return ResponseEntity.badRequest().body(message);
    }
}
