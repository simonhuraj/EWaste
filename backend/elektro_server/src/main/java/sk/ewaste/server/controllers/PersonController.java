package sk.ewaste.server.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sk.ewaste.server.entities.Person;
import sk.ewaste.server.services.PersonService;

import java.util.List;

import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequestMapping("/person")
public class PersonController {

    private PersonService personService;

    public PersonController(PersonService personService) {
        this.personService = personService;
    }

    // TODO: create endpoint that will return all people without class

    @GetMapping
    public ResponseEntity<List<Person>> getAllPersons() {
        return ok(personService.getAllPersons());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Person> getPersonById(@PathVariable("id") long id) {
        return ok(personService.getPersonById(id));
    }

    @PostMapping
    public ResponseEntity<Person> addPerson(@RequestBody Person person) {
        return ResponseEntity.status(HttpStatus.CREATED).body(personService.addPerson(person));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Person> updatePerson(@RequestBody Person person, @PathVariable("id") long id) {
        return ok(personService.updatePerson(person, id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePersonById(@PathVariable("id") long id) {
        personService.deletePersonById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
