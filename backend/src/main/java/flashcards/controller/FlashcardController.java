package flashcards.controller;

import flashcards.dto.FlashcardSetsDTO;
import flashcards.model.FlashcardSet;
import flashcards.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.Calendar;
import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.*;

@RestController
public class FlashcardController {

  @Autowired
  private FlashcardSetService flashcardSetService;

  @RequestMapping(method=GET, path="/api/flashcards")
  public ResponseEntity<FlashcardSetsDTO> getAllFlashcardSets() {
    Timestamp currentTimestamp = new Timestamp(Calendar.getInstance().getTime().getTime());
    FlashcardSetsDTO flashcardSetsDTO = new FlashcardSetsDTO(flashcardSetService.findAll(), currentTimestamp);
    return new ResponseEntity<>(flashcardSetsDTO, HttpStatus.OK);
  }

  @RequestMapping(method=GET, path="/api/flashcards/{setId}")
  public ResponseEntity<FlashcardSet> getFlashcardSetById(@PathVariable long setId) {
    FlashcardSet flashcardSet = flashcardSetService.findBySetId(setId);
    if (flashcardSet != null) {
      return new ResponseEntity<>(flashcardSet, HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }

  @RequestMapping(method=POST, path="/api/flashcards")
  public ResponseEntity<?> createFlashcardSet(@RequestBody FlashcardSet flashcardSet) {
    return new ResponseEntity<>(flashcardSetService.save(flashcardSet), HttpStatus.CREATED);
  }

  @RequestMapping(method=POST, path="/api/synchronize")
  public ResponseEntity<FlashcardSetsDTO> synchronizeFlashcardSets(@RequestBody FlashcardSetsDTO flashcardSetList) {
    return new ResponseEntity<>(flashcardSetService.synchronize(flashcardSetList), HttpStatus.OK);
  }

  @RequestMapping(method=DELETE, path="/api/flashcards/{setId}")
  public ResponseEntity<?> deleteFlashcardSetById(@PathVariable long setId) {
    FlashcardSet flashcardSet = flashcardSetService.findBySetId(setId);
    if (flashcardSet != null) {
      flashcardSetService.delete(flashcardSet);
      return new ResponseEntity<>(HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }

}
