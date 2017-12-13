package fleshcards.service;

import fleshcards.dto.UserDTO;
import fleshcards.model.User;

public interface UserService {

  User findByUsername(String username);

  User findByEmail(String username);

  Iterable<User> findAll();

  User createUser(UserDTO userDTO);

  User updateUser(UserDTO userDTO);


}
