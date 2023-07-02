package sk.ewaste.server.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sk.ewaste.server.entities.State;
import sk.ewaste.server.services.StateService;

import java.util.List;

@RestController
@RequestMapping("/state")
public class StateController {

    private final StateService stateService;

    public StateController(StateService stateService) {
        this.stateService = stateService;
    }

    @GetMapping
    public ResponseEntity<List<State>> getAllStates() {
        return ResponseEntity.ok(stateService.getAllStates());
    }

    @GetMapping("{id}")
    public ResponseEntity<State> getStateById(@PathVariable("id") long id) {
        return ResponseEntity.ok(stateService.getStateById(id));
    }
}
