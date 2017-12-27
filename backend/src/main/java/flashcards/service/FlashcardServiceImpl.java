package flashcards.service;

import flashcards.model.Flashcard;
import flashcards.repository.FlashcardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FlashcardServiceImpl implements FlashcardService {

  @Autowired
  private FlashcardRepository flashcardRepository;

  @Override
  public Flashcard save(Flashcard flashcard) {
    return flashcardRepository.save(flashcard);
  }

  @Override
  public void delete(Flashcard flashcard) { flashcardRepository.delete(flashcard); }
}
