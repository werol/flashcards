package flashcards.dto.session;

public class UserSession {

  private String username;

  private String token;

  private boolean authenticated;

  public UserSession() {}

  public UserSession(String username, String token, boolean authenticated) {
    this.username = username;
    this.token = token;
    this.authenticated = authenticated;
  }

  public String getUsername() { return username; }

  public String getToken() { return token; }

  public boolean isAuthenticated() { return authenticated; }
}
