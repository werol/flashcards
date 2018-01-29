package flashcards.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name="flashcard_sets")
public class FlashcardSet implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO )
  private Long setId;

  @Version
  @Temporal(TemporalType.TIMESTAMP)
  private Date version;

  private String owner;

  private String name;

  @OneToMany(fetch = FetchType.EAGER, cascade = {CascadeType.PERSIST, CascadeType.MERGE}, mappedBy="flashcardSet", orphanRemoval=true)
  @JsonManagedReference
  private Set<Flashcard> flashcards;

  public Long getSetId() {
    return setId;
  }

  public void setSetId(Long setId) {
    this.setId = setId;
  }

  public Date getVersion() { return version; }

  public void setVersion(Date version) { this.version = version; }

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
