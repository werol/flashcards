package fleshcards.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;
import static org.springframework.web.bind.annotation.RequestMethod.PUT;

import fleshcards.dto.session.UserSession;
import fleshcards.exceptions.AccessingPrivateResourcesException;
import fleshcards.exceptions.RegisterException;
import fleshcards.dto.UserDTO;
import fleshcards.model.User;
import fleshcards.service.UserService;

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

  @RequestMapping(method=PUT, path="/api/users")
  public @ResponseBody ResponseEntity<User> updateUser(@Valid @RequestBody UserDTO userDTO, HttpSession session) throws AccessingPrivateResourcesException {
    UserSession userSession = (UserSession) session.getAttribute("user");
    if (!userSession.getUsername().equals(userDTO.getUsername()))
      throw new AccessingPrivateResourcesException("updateUser.error.accessDenied");
    User updatedUser = userService.updateUser(userDTO);
    return ResponseEntity.ok(updatedUser);
  }

  @RequestMapping(method=GET, path="/api/users")
  public @ResponseBody Iterable<User> getAllUsers() {
    return userService.findAll();
  }
}
