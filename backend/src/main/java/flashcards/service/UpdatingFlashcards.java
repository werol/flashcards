package flashcards.service;

import flashcards.model.Flashcard;
import flashcards.model.FlashcardSet;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public class UpdatingFlashcards implements SavingFlashcardsStrategy {

  private FlashcardSetService flashcardSetService;

  private FlashcardService flashcardService;

  public UpdatingFlashcards(FlashcardSetService flashcardSetService, FlashcardService flashcardService) {
    this.flashcardSetService = flashcardSetService;
    this.flashcardService = flashcardService;
  }

  @Override
  public FlashcardSet save(FlashcardSet flashcardSet) {
    Set<Long> allFlashcardIdsFromRequest = flashcardSet
      .getFlashcards()
      .stream()
      .map(Flashcard::getFlashcardId)
      .collect(Collectors.toSet());

    List<Flashcard> flashcardsToDelete = flashcardSetService
      .findBySetId(flashcardSet.getSetId())
      .getFlashcards()
      .stream()
      .filter(flashcard -> !allFlashcardIdsFromRequest.contains(flashcard.getFlashcardId()))
      .collect(Collectors.toList());

    flashcardsToDelete
      .forEach(flashcard -> flashcardService.delete(flashcard));

    return flashcardSetService.save(flashcardSet);
  }

}
