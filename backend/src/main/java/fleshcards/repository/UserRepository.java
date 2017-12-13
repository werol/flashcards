package fleshcards.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import fleshcards.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

  User findByUsername(String username);

  User findByEmail(String email);

}
