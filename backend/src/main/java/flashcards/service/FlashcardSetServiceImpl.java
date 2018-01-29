package flashcards.service;

import flashcards.model.FlashcardSet;
import flashcards.repository.FlashcardSetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.ObjectOptimisticLockingFailureException;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.LockModeType;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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

  @Override
  public List<FlashcardSet> synchronize(List<FlashcardSet> flashcardSetList) {
    handleDelete(flashcardSetList);
    return handleAddAndUpdate(flashcardSetList);
  }

  private void handleDelete(List<FlashcardSet> flashcardSetList) {
    List<Long> setIdsRequest =
      flashcardSetList
        .stream()
        .map(FlashcardSet::getSetId)
        .collect(Collectors.toList());
    List<Long> setIdsDB =
      findAll()
        .stream()
        .map(FlashcardSet::getSetId)
        .collect(Collectors.toList());
    setIdsDB.removeAll(setIdsRequest);
    setIdsDB.forEach(setId -> delete(findBySetId(setId)));
  }

  private List<FlashcardSet> handleAddAndUpdate(List<FlashcardSet> flashcardSetList) {
    List<FlashcardSet> flashcardSetsWithConflicts = new ArrayList<>();
    flashcardSetList.forEach(set -> {
      try {
        save(set);
      } catch (ObjectOptimisticLockingFailureException e) {
        FlashcardSet versionFromDB = findBySetId(set.getSetId());
        flashcardSetsWithConflicts.add(versionFromDB);
      }
    });
    return flashcardSetsWithConflicts;
  }

}
