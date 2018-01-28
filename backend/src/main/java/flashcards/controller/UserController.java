package flashcards.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;
import static org.springframework.web.bind.annotation.RequestMethod.PUT;

import flashcards.dto.session.UserSession;
import flashcards.exceptions.AccessingPrivateResourcesException;
import flashcards.exceptions.RegisterException;
import flashcards.dto.UserDTO;
import flashcards.model.User;
import flashcards.service.UserService;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;


@RestController
public class UserController {

  @Autowired
  private UserService userService;

  @RequestMapping(method=POST, path="/api/register")
  public @ResponseBody ResponseEntity<User> createUser(@Valid @RequestBody UserDTO userDTO) throws RegisterException {
    if (userService.findByUsername(userDTO.getUsername()) != null) {
      throw new RegisterException("register.error.usernameExists");
    }
    if (userService.findByEmail(userDTO.getEmail()) != null) {
      throw new RegisterException("register.error.emailExists");
    }
    User user = userService.createUser(userDTO);
    return ResponseEntity.ok(user);
  }

  @RequestMapping(method=GET, path="/api/users")
  public @ResponseBody Iterable<User> getAllUsers() {
    return userService.findAll();
  }

}
