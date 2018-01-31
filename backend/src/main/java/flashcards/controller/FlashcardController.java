package flashcards.controller;

import flashcards.dto.FlashcardSetsDTO;
import flashcards.model.FlashcardSet;
import flashcards.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.sql.Timestamp;
import java.util.Calendar;

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
  public ResponseEntity<FlashcardSet> createFlashcardSet(@Valid @RequestBody FlashcardSet flashcardSet) {
    return new ResponseEntity<>(flashcardSetService.save(flashcardSet), HttpStatus.CREATED);
  }

  @RequestMapping(method=PUT, path="/api/flashcards")
  public ResponseEntity<FlashcardSet> updateFlashcardSet(@Valid @RequestBody FlashcardSet flashcardSet) {
    if (flashcardSetService.findBySetId(flashcardSet.getSetId()) != null) {
      return new ResponseEntity<>(flashcardSetService.save(flashcardSet), HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }

  @RequestMapping(method=POST, path="/api/synchronize")
  public ResponseEntity<FlashcardSetsDTO> synchronizeFlashcardSets(@Valid @RequestBody FlashcardSetsDTO flashcardSetList) {
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
