package sk.ewaste.server.rest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sk.ewaste.server.entities.Manager;
import sk.ewaste.server.services.ManagerService;

import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequestMapping("/manager")
public class ManagerController {

    private final ManagerService managerService;


    public ManagerController(ManagerService managerService) {
        this.managerService = managerService;
    }

    @GetMapping("/id/{managerId}")
    public ResponseEntity<Manager> getManagerById(@PathVariable("managerId") Long managerId) {
        return ok(managerService.getManagerById(managerId));
    }

    @GetMapping("/username/{userName}")
    public ResponseEntity<Manager> getUserByUserName(@PathVariable("userName") String userName) {
        return ok(managerService.getManagerByUsername(userName));
    }

    @PostMapping
    public ResponseEntity<Manager> registerNewUser(@RequestBody Manager manager) {
        return new ResponseEntity<>(managerService.registerNewManager(manager), HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<Boolean> login(@RequestBody Manager manager) {
        if (managerService.authenticate(manager.getUsername(), manager.getPassword())) {
            return ok(true);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(false);
        }
    }
}

