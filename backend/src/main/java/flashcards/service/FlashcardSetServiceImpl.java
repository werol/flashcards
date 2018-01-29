package flashcards.service;

import flashcards.dto.FlashcardSetsDTO;
import flashcards.model.FlashcardSet;
import flashcards.repository.FlashcardSetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.ObjectOptimisticLockingFailureException;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Calendar;
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
    Timestamp currentTimestamp = new Timestamp(Calendar.getInstance().getTime().getTime());
    flashcardSet.setLastModified(currentTimestamp);
    return flashcardSetRepository.save(flashcardSet);
  }

  @Override
  public void delete(FlashcardSet flashcardSet) {
    flashcardSetRepository.delete(flashcardSet);
  }

  @Override
  public FlashcardSetsDTO synchronize(FlashcardSetsDTO flashcardSets) {
    handleDelete(flashcardSets);
    return handleAddAndUpdate(flashcardSets);
  }

  private void handleDelete(FlashcardSetsDTO flashcardSets) {
    List<Long> setIdsRequest =
      flashcardSets.getFlashcardSets()
        .stream()
        .map(FlashcardSet::getSetId)
        .collect(Collectors.toList());
    List<Long> setIdsDB =
      findAll()
        .stream()
        .map(FlashcardSet::getSetId)
        .collect(Collectors.toList());
    setIdsDB.removeAll(setIdsRequest);
    setIdsDB.forEach(setId -> {
      if (findBySetId(setId).getLastModified().before(flashcardSets.getVersion()))
        delete(findBySetId(setId));
    });
  }

  private FlashcardSetsDTO handleAddAndUpdate(FlashcardSetsDTO flashcardSets) {
    List<FlashcardSet> flashcardSetsWithConflicts = new ArrayList<>();
    Timestamp currentTimestamp = new Timestamp(Calendar.getInstance().getTime().getTime());
    flashcardSets.getFlashcardSets().forEach(set -> {
      try {
        if (set.getLastModified() == null) set.setLastModified(currentTimestamp);
        flashcardSetRepository.save(set);
      } catch (ObjectOptimisticLockingFailureException e) {
        FlashcardSet versionFromDB = findBySetId(set.getSetId());
        flashcardSetsWithConflicts.add(versionFromDB);
      }
    });
    return new FlashcardSetsDTO(flashcardSetsWithConflicts, currentTimestamp);
  }

}
