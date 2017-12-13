package fleshcards.controller;

import fleshcards.model.Fleshcard;
import fleshcards.model.FleshcardSet;
import fleshcards.service.FleshcardService;
import fleshcards.service.FleshcardSetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.DELETE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController
public class FleshcardController {

  @Autowired
  private FleshcardSetService fleshcardSetService;

  @Autowired
  private FleshcardService fleshcardService;

  @RequestMapping(method=GET, path="/api/fleshcards")
  public ResponseEntity<List<FleshcardSet>> getAllFleshcardSets() {
    return new ResponseEntity<>(fleshcardSetService.findAll(), HttpStatus.OK);
  }

  @RequestMapping(method=GET, path="/api/fleshcards/{set_id}")
  public ResponseEntity<FleshcardSet> getFleshcardSetById(@PathVariable long set_id) {
    FleshcardSet fleshcardSet = fleshcardSetService.findBySetId(set_id);
    if (fleshcardSet != null) {
      return new ResponseEntity<>(fleshcardSet, HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }

  @RequestMapping(method=POST, path="/api/fleshcards")
  public ResponseEntity<?> createFleshcardSet(@RequestBody FleshcardSet fleshcardSet) {
    return new ResponseEntity<>(fleshcardSetService.save(fleshcardSet), HttpStatus.CREATED);
  }

  @RequestMapping(method=DELETE, path="/api/fleshcards/{set_id}")
  public ResponseEntity<?> deleteFleshcardSetById(@PathVariable long set_id) {
    FleshcardSet fleshcardSet = fleshcardSetService.findBySetId(set_id);
    if (fleshcardSet != null) {
      fleshcardSetService.delete(fleshcardSet);
      return new ResponseEntity<>(HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }

}
