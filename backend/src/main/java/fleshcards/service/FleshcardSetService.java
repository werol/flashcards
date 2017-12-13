package fleshcards.service;

import fleshcards.model.FleshcardSet;

import java.util.List;

public interface FleshcardSetService {

  List<FleshcardSet> findAll();

  FleshcardSet findBySetId(long set_id);

  FleshcardSet save(FleshcardSet fleshcardSet);

  void delete(FleshcardSet fleshcardSet);
}
