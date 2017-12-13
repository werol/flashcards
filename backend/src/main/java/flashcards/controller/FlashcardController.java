package flashcards.controller;

import flashcards.model.FlashcardSet;
import flashcards.service.FlashcardService;
import flashcards.service.FlashcardSetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.DELETE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController
public class FlashcardController {

  @Autowired
  private FlashcardSetService flashcardSetService;

  @Autowired
  private FlashcardService flashcardService;

  @RequestMapping(method=GET, path="/api/flashcards")
  public ResponseEntity<List<FlashcardSet>> getAllFlashcardSets() {
    return new ResponseEntity<>(flashcardSetService.findAll(), HttpStatus.OK);
  }

  @RequestMapping(method=GET, path="/api/flashcards/{set_id}")
  public ResponseEntity<FlashcardSet> getFlashcardSetById(@PathVariable long set_id) {
    FlashcardSet flashcardSet = flashcardSetService.findBySetId(set_id);
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
