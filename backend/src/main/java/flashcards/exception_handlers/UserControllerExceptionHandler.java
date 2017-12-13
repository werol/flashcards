package flashcards.exception_handlers;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import flashcards.controller.UserController;
import flashcards.exceptions.AccessingPrivateResourcesException;
import flashcards.exceptions.RegisterException;
import flashcards.dto.ErrorMessage;

@ControllerAdvice(assignableTypes = UserController.class)
public class UserControllerExceptionHandler {
  private final Log log = LogFactory.getLog(getClass());

  @ExceptionHandler(RegisterException.class)
  @ResponseBody
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  public ErrorMessage handleRegisterException(RegisterException e) {
    log.warn(e.getMessage());
    return new ErrorMessage(e.getMessage());
  }

  @ExceptionHandler(AccessingPrivateResourcesException.class)
  @ResponseBody
  @ResponseStatus(HttpStatus.UNAUTHORIZED)
  public ErrorMessage handleAccessingPrivateResourcesException(AccessingPrivateResourcesException e) {
    log.warn(e.getMessage());
    return new ErrorMessage(e.getMessage());
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  @ResponseBody
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  public ErrorMessage handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
    log.warn(e.getMessage());
    return new ErrorMessage("userData.error.badRequest");
  }

  @ExceptionHandler(Exception.class)
  @ResponseBody
  public ErrorMessage handleUnknownException(Exception e) {
    return new ErrorMessage("userService.error.unknownError");
  }

}
