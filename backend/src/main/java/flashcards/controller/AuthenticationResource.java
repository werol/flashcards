package flashcards.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import flashcards.dto.session.Credentials;
import flashcards.dto.session.UserSession;

import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/session")
public class AuthenticationResource {

  @Autowired
  AuthenticationManager authenticationManager;

  @RequestMapping(method = RequestMethod.POST)
  public UserSession login(@RequestBody Credentials credentials, HttpSession httpSession) {
    Authentication authentication = new UsernamePasswordAuthenticationToken(credentials.getUsername(), credentials.getPassword());
    SecurityContextHolder.getContext().setAuthentication(authenticationManager.authenticate(authentication));
    UserSession userSession = new UserSession(credentials.getUsername(), httpSession.getId(), true);
    httpSession.setAttribute("user", userSession);
    return userSession;
  }

  @RequestMapping(method = RequestMethod.GET)
  public UserSession session(HttpSession session) {
    return (UserSession) session.getAttribute("user");
  }

  @RequestMapping(method = RequestMethod.DELETE)
  public void logout(HttpSession session) {
    session.invalidate();
  }

}
