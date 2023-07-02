package sk.ewaste.server.services;

import jakarta.annotation.Nonnull;
import jakarta.persistence.NoResultException;
import org.springframework.stereotype.Service;
import sk.ewaste.server.entities.State;
import sk.ewaste.server.repositories.StateRepository;

import java.util.List;

@Service
public class StateService {

    private StateRepository stateRepository;

    public StateService(StateRepository stateRepository) {
        this.stateRepository = stateRepository;
    }

    public List<State> getAllStates() {
        return stateRepository.findAll();
    }

    public State getStateById(@Nonnull Long id) {
        return stateRepository.findById(id).orElseThrow(NoResultException::new);
    }
}
