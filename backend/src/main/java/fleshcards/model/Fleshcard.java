package fleshcards.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name="fleshcards")
public class Fleshcard implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO )
  private long fleshcardId;

  private String frontSide;

  private String backSide;

  @ManyToOne
  @JoinColumn(name="set_id")
  @JsonBackReference
  private FleshcardSet fleshcardSet;

  public long getFleshcardId() {
    return fleshcardId;
  }

  public void setFleshcardId(int fleshcardId) {
    this.fleshcardId = fleshcardId;
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

  public FleshcardSet getFleshcardSet() {
    return fleshcardSet;
  }

  public void setFleshcardSet(FleshcardSet fleshcardSet) {
    this.fleshcardSet = fleshcardSet;
  }

}
