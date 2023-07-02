package sk.ewaste.server.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sk.ewaste.server.entities.User;
import sk.ewaste.server.services.UserService;

import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;


    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/id/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable("userId") Long userId) {
        return ok(userService.getUserById(userId));
    }

    @GetMapping("/username/{userName}")
    public ResponseEntity<User> getUserByUserName(@PathVariable("userName") String userName) {
        return ok(userService.getUserByUsername(userName));
    }

    @PostMapping
    public ResponseEntity<User> registerNewUser(@RequestBody User user) {
        return new ResponseEntity<>(userService.registerNewUser(user), HttpStatus.CREATED);
    }
}

