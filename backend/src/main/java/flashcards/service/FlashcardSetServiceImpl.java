package flashcards.service;

import flashcards.model.FlashcardSet;
import flashcards.repository.FlashcardSetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FlashcardSetServiceImpl implements FlashcardSetService {

  @Autowired
  private FlashcardSetRepository flashcardSetRepository;

  @Override
  public List<FlashcardSet> findAll() {
    return flashcardSetRepository.findAll();
  }

  @Override
  public FlashcardSet findBySetId(long setId) {
    return flashcardSetRepository.findOne(setId);
  }

  @Override
  public FlashcardSet save(FlashcardSet flashcardSet) {
    return flashcardSetRepository.save(flashcardSet);
  }

  @Override
  public void delete(FlashcardSet flashcardSet) {
    flashcardSetRepository.delete(flashcardSet);
  }
}
