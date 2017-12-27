package flashcards.service;

import flashcards.model.FlashcardSet;

public class SavingFlashcardsContext {

  private SavingFlashcardsStrategy strategy;

  public void setStrategy(SavingFlashcardsStrategy strategy) {
    this.strategy = strategy;
  }

  public FlashcardSet saveFlashcardSet(FlashcardSet flashcardSet) {
    return strategy.save(flashcardSet);
  }
}
