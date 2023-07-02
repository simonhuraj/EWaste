package sk.ewaste.server.services;

import jakarta.annotation.Nonnull;
import jakarta.persistence.NoResultException;
import org.springframework.stereotype.Service;
import sk.ewaste.server.entities.Person;
import sk.ewaste.server.repositories.PersonRepository;

import java.util.List;

@Service
public class PersonService {

    private final PersonRepository personRepository;

    public PersonService(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    public List<Person> getAllPersons() {
        return personRepository.findAll();
    }

    public List<Person> getAllPeopleWithoutClass() {
        return personRepository.findAllWithoutClass();
    }

    public Person getPersonById(@Nonnull Long id) {
        return personRepository.findById(id).orElseThrow(() -> new NoResultException("Person with id " + id + " does not exist"));
    }

    public Person addPerson(Person person) {
        return personRepository.save(person);
    }

    public Person updatePerson(@Nonnull Person person, long id) {
        if (person.getPersonId() != id) throw new IllegalArgumentException("Person id does not match updated person");

        Person toUpdate = getPersonById(id);
        toUpdate.setFirstName(person.getFirstName());
        toUpdate.setLastName(person.getLastName());
        toUpdate.setEmail(person.getEmail());
        toUpdate.setQuantity(person.getQuantity());
        toUpdate.setPosition(person.getPosition());

        return personRepository.save(person);
    }

    public void deletePersonById(@Nonnull Long id) {
        personRepository.deleteById(id);
    }

    public Person addDeliveredProducts(Person person, long quantity) {
        Person toUpdate = getPersonById(person.getPersonId());

        toUpdate.setQuantity(toUpdate.getQuantity() + quantity);
        return personRepository.save(toUpdate);
    }

    public void removeDeliveredProducts(Person person, long quantity) {
        Person toUpdate = getPersonById(person.getPersonId());

        toUpdate.setQuantity(toUpdate.getQuantity() - quantity);
        personRepository.save(toUpdate);
    }
}
