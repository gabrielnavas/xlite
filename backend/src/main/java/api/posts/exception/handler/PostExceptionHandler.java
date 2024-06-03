package api.posts.exception.handler;

import api.posts.exception.response.Message;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

@ControllerAdvice
public class PostExceptionHandler {

    @Value("${spring.servlet.multipart.max-file-size}")
    private String maxFileSize;

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<Message>  maxUploadSizeImage(MaxUploadSizeExceededException e) {
        Message message = new Message();
        message.setMessage(String.format("max upload size is %s", maxFileSize));
        return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
    }
}
