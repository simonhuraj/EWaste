package sk.ewaste.server.services;

import jakarta.annotation.Nonnull;
import jakarta.persistence.NoResultException;
import org.springframework.stereotype.Service;
import sk.ewaste.server.entities.Position;
import sk.ewaste.server.repositories.PositionRepository;

import java.util.List;

@Service
public class PositionService {

    private PositionRepository positionRepository;

    public PositionService(PositionRepository positionRepository) {
        this.positionRepository = positionRepository;
    }

    public List<Position> getAllPositions() {
        return positionRepository.findAll();
    }

    public Position getPositionById(@Nonnull Long id) {
        return positionRepository.findById(id).orElseThrow(NoResultException::new);
    }
}
