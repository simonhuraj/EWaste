package sk.ewaste.server.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sk.ewaste.server.entities.Position;
import sk.ewaste.server.services.PositionService;

import java.util.List;

@RestController
@RequestMapping("/position")
public class PositionController {

    private final PositionService positionService;

    public PositionController(PositionService positionService) {
        this.positionService = positionService;
    }

    @GetMapping
    public ResponseEntity<List<Position>> getAllPositions() {
        return ResponseEntity.ok(positionService.getAllPositions());
    }

    @GetMapping("{id}")
    public ResponseEntity<Position> getPositionById(@PathVariable("id") long id) {
        return ResponseEntity.ok(positionService.getPositionById(id));
    }
}
