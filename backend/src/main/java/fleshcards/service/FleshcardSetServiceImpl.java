package fleshcards.service;

import fleshcards.model.FleshcardSet;
import fleshcards.repository.FleshcardSetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FleshcardSetServiceImpl implements FleshcardSetService {

  @Autowired
  private FleshcardSetRepository fleshcardSetRepository;

  @Override
  public List<FleshcardSet> findAll() {
    return fleshcardSetRepository.findAll();
  }

  @Override
  public FleshcardSet findBySetId(long set_id) {
    return fleshcardSetRepository.findOne(set_id);
  }

  @Override
  public FleshcardSet save(FleshcardSet fleshcardSet) {
    return fleshcardSetRepository.save(fleshcardSet);
  }
  @Override
  public void delete(FleshcardSet fleshcardSet) {
    fleshcardSetRepository.delete(fleshcardSet);
  }
}
