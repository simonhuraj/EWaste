package sk.ewaste.server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sk.ewaste.server.entities.Delivery;

@Repository
public interface DeliveryRepository extends JpaRepository<Delivery, Long> {
}