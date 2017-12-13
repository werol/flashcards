package fleshcards.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import fleshcards.dto.UserDTO;
import fleshcards.model.User;
import fleshcards.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private BCryptPasswordEncoder bCryptPasswordEncoder;


  @Override
  public User findByUsername(String username) {
    return userRepository.findByUsername(username);
  }

  @Override
  public User findByEmail(String username) {
    return userRepository.findByEmail(username);
  }

  @Override
  public Iterable<User> findAll() {
    return userRepository.findAll();
  }

  @Override
  public User createUser(UserDTO userDTO) {
    User user = userDTO.toUser(bCryptPasswordEncoder.encode(userDTO.getPassword()),"USER");
    return userRepository.save(user);
  }

  @Override
  public User updateUser(UserDTO userDTO) {
    User updatedUser = userRepository.findByUsername(userDTO.getUsername());
    updatedUser.setFirstName(userDTO.getFirstName());
    updatedUser.setLastName(userDTO.getLastName());
    updatedUser.setEmail(userDTO.getEmail());
    updatedUser.setPassword(bCryptPasswordEncoder.encode(userDTO.getPassword()));
    return userRepository.save(updatedUser);
  }
}
