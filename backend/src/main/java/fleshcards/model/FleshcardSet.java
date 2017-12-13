package fleshcards.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="fleshcard_sets")
public class FleshcardSet implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO )
  private long setId;

  private String owner;

  private String name;

  @OneToMany(cascade = {CascadeType.ALL}, mappedBy="fleshcardSet")
  @JsonManagedReference
  private Set<Fleshcard> fleshcards = new HashSet<>();

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

  public Set<Fleshcard> getFleshcards() {
    return fleshcards;
  }

  public void setFleshcards(Set<Fleshcard> fleshcards) {
    this.fleshcards = fleshcards;
  }
}
