package sk.ewaste.server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sk.ewaste.server.entities.Clazz;

@Repository
public interface ClassRepository extends JpaRepository<Clazz, Long> {
}