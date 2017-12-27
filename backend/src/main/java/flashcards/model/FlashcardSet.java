package flashcards.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="flashcard_sets")
public class FlashcardSet implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO )
  private long setId;

  private String owner;

  private String name;

  @OneToMany(cascade = {CascadeType.ALL}, mappedBy="flashcardSet", orphanRemoval=true)
  @JsonManagedReference
  private Set<Flashcard> flashcards = new HashSet<>();

  public long getSetId() {
    return setId;
  }

  public void setSetId(long setId) {
    this.setId = setId;
  }

  public String getOwner() {
    return this.owner;
  }

  public void setOwner(String owner) {
    this.owner = owner;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Set<Flashcard> getFlashcards() {
    return flashcards;
  }

  public void setFlashcards(Set<Flashcard> flashcards) {
    this.flashcards = flashcards;
  }
}
