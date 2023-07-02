package sk.ewaste.server.services;

import jakarta.annotation.Nonnull;
import jakarta.persistence.NoResultException;
import org.springframework.stereotype.Service;
import sk.ewaste.server.entities.Clazz;
import sk.ewaste.server.entities.Person;
import sk.ewaste.server.repositories.ClassRepository;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Service
public class ClassService {

    private final ClassRepository classRepository;

    private final PersonService personService;

    public ClassService(ClassRepository classRepository, PersonService personService) {
        this.classRepository = classRepository;
        this.personService = personService;
    }

    public List<Clazz> getAllClasses() {
        return classRepository.findAll();
    }

    public Clazz getClassById(@Nonnull Long id) {
        return classRepository.findById(id).orElseThrow(NoResultException::new);
    }

    public Clazz addNewClass(@Nonnull Clazz clazz) {
        if (clazz.getPersons() == null) clazz.setPersons(Collections.emptySet());
        return classRepository.save(clazz);
    }

    public Clazz updateClass(@Nonnull Clazz clazz, @Nonnull Long id) {
        if (clazz.getClassId() != id) throw new IllegalArgumentException("Class id does not match");

        Clazz toUpdate = getClassById(id);
        toUpdate.setName(clazz.getName());
        toUpdate.setPersons(clazz.getPersons());

        return classRepository.save(clazz);
    }

    public void deleteClass(@Nonnull Long id) {
        classRepository.deleteById(id);
    }

    public void addPersonToClass(@Nonnull Long classId, @Nonnull Long personId) {
        if (!classRepository.existsById(classId)) throw new IllegalArgumentException("Class with id " + classId + " does not exist");

        Person person = personService.getPersonById(personId);

        Clazz clazz = getClassById(classId);
        clazz.getPersons().add(person);
        classRepository.save(clazz);
    }

    public void removePersonFromClass(@Nonnull Long classId, @Nonnull Long personId) {
        if (!classRepository.existsById(classId)) throw new IllegalArgumentException("Class with id " + classId + " does not exist");

        Person person = personService.getPersonById(personId);

        Clazz clazz = getClassById(classId);

        clazz.getPersons().remove(person);
        classRepository.save(clazz);
    }
}
