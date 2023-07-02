package sk.ewaste.server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sk.ewaste.server.entities.State;

@Repository
public interface StateRepository extends JpaRepository<State, Long> {
}
