package flashcards.dto;

import flashcards.model.FlashcardSet;

import javax.validation.constraints.NotNull;
import java.sql.Timestamp;
import java.util.List;

public class FlashcardSetsDTO {

  @NotNull
  private List<FlashcardSet> flashcardSets;

  @NotNull
  private Timestamp version;

  public FlashcardSetsDTO(List<FlashcardSet> flashcardSets, Timestamp version) {
    this.flashcardSets = flashcardSets;
    this.version = version;
  }

  public FlashcardSetsDTO() {}

  public List<FlashcardSet> getFlashcardSets() {
    return flashcardSets;
  }

  public void setFlashcardSets(List<FlashcardSet> flashcardSets) {
    this.flashcardSets = flashcardSets;
  }

  public Timestamp getVersion() {
    return version;
  }

  public void setVersion(Timestamp version) {
    this.version = version;
  }
}
