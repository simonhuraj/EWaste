package sk.ewaste.server.services;

import jakarta.annotation.Nonnull;
import jakarta.persistence.NoResultException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import sk.ewaste.server.entities.User;
import sk.ewaste.server.repositories.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User getUserByUsername(@Nonnull String username) {
        return userRepository.findByUsername(username).orElseThrow(() -> new NoResultException("User with username " + username + " does not exist"));
    }

    public User getUserById(@Nonnull Long userId) {
        return userRepository.findById(userId).orElseThrow(() -> new NoResultException("User with id " + userId + " does not exist"));
    }

    public User registerNewUser(@Nonnull User user) {
        if (user.getUserId() != null) {
            throw new IllegalArgumentException("User already exists");
        }

        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new IllegalArgumentException("User with username '" + user.getUsername() + "' already exists");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return userRepository.save(user);
    }

    public boolean authenticate(@Nonnull String username, @Nonnull String password) {
        User user = getUserByUsername(username);

        return passwordEncoder.matches(password, user.getPassword());
    }
}
