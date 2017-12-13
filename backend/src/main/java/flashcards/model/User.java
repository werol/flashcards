package flashcards.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

@Entity
@Table(name="users")
public class User implements Serializable {

  @Id
  private String username;

  private String password;

  private String firstName;

  private String lastName;

  private String email;

  private String role;

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getFirstName() { return firstName; }

  public void setFirstName(String firstName) { this.firstName = firstName; }

  public String getLastName() { return lastName; }

  public void setLastName(String lastName) { this.lastName = lastName; }

  public String getEmail() { return email; }

  public void setEmail(String email) { this.email = email; }

  public String getRole() {
    return role;
  }

  public void setRole(String role) {
    this.role = role;
  }
}
