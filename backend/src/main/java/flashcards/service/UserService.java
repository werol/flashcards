package flashcards.service;

import flashcards.dto.UserDTO;
import flashcards.model.User;

public interface UserService {

  User findByUsername(String username);

  User findByEmail(String username);

  Iterable<User> findAll();

  User createUser(UserDTO userDTO);

}
