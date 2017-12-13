package flashcards.repository;

import flashcards.model.FlashcardSet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FlashcardSetRepository extends JpaRepository<FlashcardSet, Long> {

  List<FlashcardSet> findAll();

}
