package sk.ewaste.server.services;

import jakarta.annotation.Nonnull;
import jakarta.persistence.NoResultException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import sk.ewaste.server.entities.Manager;
import sk.ewaste.server.repositories.ManagerRepository;

@Service
public class ManagerService {

    private final ManagerRepository managerRepository;

    private final PasswordEncoder passwordEncoder;

    public ManagerService(ManagerRepository managerRepository, PasswordEncoder passwordEncoder) {
        this.managerRepository = managerRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Manager getManagerByUsername(@Nonnull String username) {
        return managerRepository.findByUsername(username).orElseThrow(() -> new NoResultException("Manager with username " + username + " does not exist"));
    }

    public Manager getManagerById(@Nonnull Long managerId) {
        return managerRepository.findById(managerId).orElseThrow(() -> new NoResultException("Manager with id " + managerId + " does not exist"));
    }

    public Manager registerNewManager(@Nonnull Manager manager) {
        if (manager.getManagerId() != null) {
            throw new IllegalArgumentException("Manager already exists");
        }

        if (managerRepository.findByUsername(manager.getUsername()).isPresent()) {
            throw new IllegalArgumentException("Manager with username '" + manager.getUsername() + "' already exists");
        }

        manager.setPassword(passwordEncoder.encode(manager.getPassword()));

        return managerRepository.save(manager);
    }

    public boolean authenticate(@Nonnull String username, @Nonnull String password) {
        Manager manager = getManagerByUsername(username);

        return passwordEncoder.matches(password, manager.getPassword());
    }
}
