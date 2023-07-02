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
import sk.ewaste.server.entities.Clazz;
import sk.ewaste.server.services.ClassService;

import java.util.List;

import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequestMapping("/class")
public class ClassController {

    private final ClassService classService;

    public ClassController(ClassService classService) {
        this.classService = classService;
    }

    @GetMapping
    public ResponseEntity<List<Clazz>> getAllClasses() {
        return ok(classService.getAllClasses());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Clazz> getClassById(@PathVariable("id") long id) {
        return ok(classService.getClassById(id));
    }

    @PostMapping
    public ResponseEntity<Clazz> addClass(@RequestBody Clazz clazz) {
        return ResponseEntity.status(HttpStatus.CREATED).body(clazz);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Clazz> updateClass(@RequestBody Clazz clazz, @PathVariable("id") long id) {
        return ok(classService.updateClass(clazz, id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClassById(@PathVariable("id") long id) {
        classService.deleteClass(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @GetMapping("/add/{class}/{student}")
    public void addStudentToClass(@PathVariable("class") long classId, @PathVariable("student") long personId) {
        classService.addPersonToClass(classId, personId);
    }

    @GetMapping("/remove/{class}/{student}")
    public void removeStudentFromClass(@PathVariable("class") long classId, @PathVariable("student") long personId) {
        classService.removePersonFromClass(classId, personId);
    }
}
