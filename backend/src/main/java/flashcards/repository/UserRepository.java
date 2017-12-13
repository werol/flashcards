package flashcards.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import flashcards.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

  User findByUsername(String username);

  User findByEmail(String email);

}
