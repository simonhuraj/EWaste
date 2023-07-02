package sk.ewaste.server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sk.ewaste.server.entities.Person;

@Repository
public interface PersonRepository extends JpaRepository<Person, Long> {
}