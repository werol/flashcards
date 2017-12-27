package flashcards.service;

import flashcards.model.Flashcard;

public interface FlashcardService {

  Flashcard save(Flashcard flashcard);

  void delete(Flashcard flashcard);
}
