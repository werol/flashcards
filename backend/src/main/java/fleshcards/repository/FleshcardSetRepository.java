package fleshcards.repository;

import fleshcards.model.FleshcardSet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FleshcardSetRepository extends JpaRepository<FleshcardSet, Long> {

  List<FleshcardSet> findAll();

}
