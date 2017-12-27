package flashcards.service;

import flashcards.model.FlashcardSet;

import java.util.List;

public interface FlashcardSetService {

  List<FlashcardSet> findAll();

  FlashcardSet findBySetId(long setId);

  FlashcardSet save(FlashcardSet flashcardSet);

  void delete(FlashcardSet flashcardSet);
}
