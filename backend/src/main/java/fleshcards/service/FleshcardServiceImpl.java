package fleshcards.service;

import fleshcards.model.Fleshcard;
import fleshcards.model.FleshcardSet;
import fleshcards.repository.FleshcardRepository;
import fleshcards.repository.FleshcardSetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FleshcardServiceImpl implements FleshcardService {

  @Autowired
  private FleshcardRepository fleshcardRepository;

  @Override
  public Fleshcard save(Fleshcard fleshcard) {
    return fleshcardRepository.save(fleshcard);
  }
}
