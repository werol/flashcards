package flashcards.service;

import flashcards.model.FlashcardSet;

public class SavingNewFlashcards implements SavingFlashcardsStrategy {

  private FlashcardSetService flashcardSetService;

  public SavingNewFlashcards(FlashcardSetService flashcardSetService) {
    this.flashcardSetService = flashcardSetService;
  }

  @Override
  public FlashcardSet save(FlashcardSet flashcardSet) {
    return flashcardSetService.save(flashcardSet);
  }

}
