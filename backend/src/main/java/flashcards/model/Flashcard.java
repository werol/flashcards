package flashcards.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name= "flashcards")
public class Flashcard implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO )
  private Long flashcardId;

  private String frontSide;

  private String backSide;

  @ManyToOne
  @JoinColumn(name="set_id")
  @JsonBackReference
  private FlashcardSet flashcardSet;

  public Long getFlashcardId() { return flashcardId; }

  public void setFlashcardId(Long flashcardId) {
    this.flashcardId = flashcardId;
  }

  public String getFrontSide() {
    return frontSide;
  }

  public void setFrontSide(String frontSide) {
    this.frontSide = frontSide;
  }

  public String getBackSide() {
    return backSide;
  }

  public void setBackSide(String backSide) {
    this.backSide = backSide;
  }

  public FlashcardSet getFlashcardSet() {
    return flashcardSet;
  }

  public void setFlashcardSet(FlashcardSet flashcardSet) {
    this.flashcardSet = flashcardSet;
  }

}
