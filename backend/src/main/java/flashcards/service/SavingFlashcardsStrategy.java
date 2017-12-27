package flashcards.service;

import flashcards.model.FlashcardSet;

public interface SavingFlashcardsStrategy {

  FlashcardSet save(FlashcardSet flashcardSet);

}
