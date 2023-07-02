package sk.ewaste.server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sk.ewaste.server.entities.Position;

@Repository
public interface PositionRepository extends JpaRepository<Position, Long> {
}