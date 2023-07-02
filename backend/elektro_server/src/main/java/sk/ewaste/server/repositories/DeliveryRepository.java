package sk.ewaste.server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sk.ewaste.server.entities.Delivery;

import java.util.List;

@Repository
public interface DeliveryRepository extends JpaRepository<Delivery, Long> {

    List<Delivery> findAllByPersonPersonId(Long personId);

    List<Delivery> findAllByUserUserId(Long userId);

    List<Delivery> findAllByFunctional(boolean functional);
}