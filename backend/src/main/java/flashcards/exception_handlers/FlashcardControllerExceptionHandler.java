package flashcards.exception_handlers;

import flashcards.controller.FlashcardController;
import flashcards.dto.ErrorMessage;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.http.HttpStatus;
import org.springframework.orm.ObjectOptimisticLockingFailureException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice(assignableTypes = FlashcardController.class)
public class FlashcardControllerExceptionHandler {
  private final Log log = LogFactory.getLog(getClass());

  @ExceptionHandler(ObjectOptimisticLockingFailureException.class)
  @ResponseBody
  @ResponseStatus(HttpStatus.CONFLICT)
  public ErrorMessage handleStaleObjectStateException(ObjectOptimisticLockingFailureException e) {
    log.warn(e.getMessage());
    return new ErrorMessage("flashcards.error.setsConflicted");
  }

}
