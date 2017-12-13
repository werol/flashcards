package fleshcards.repository;

import fleshcards.model.Fleshcard;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FleshcardRepository extends JpaRepository<Fleshcard, Long> {

}
