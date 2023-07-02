package sk.ewaste.server.services;

import jakarta.annotation.Nonnull;
import jakarta.persistence.NoResultException;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import sk.ewaste.server.entities.Delivery;
import sk.ewaste.server.entities.Person;
import sk.ewaste.server.repositories.DeliveryRepository;

import java.util.List;

@Service
public class DeliveryService {

    private final DeliveryRepository deliveryRepository;

    private final PersonService personService;

    public DeliveryService(DeliveryRepository deliveryRepository, PersonService personService) {
        this.deliveryRepository = deliveryRepository;
        this.personService = personService;
    }

    public List<Delivery> getAllDeliveries() {
        return deliveryRepository.findAll();
    }

    public List<Delivery> getAllDeliveriesByPersonId(@Nonnull Long personId) {
        return deliveryRepository.findAllByPersonPersonId(personId);
    }

    public List<Delivery> getAllDeliveriesByUserId(@Nonnull Long userId) {
        return deliveryRepository.findAllByUserUserId(userId);
    }

    public List<Delivery> getAllByFunctional(boolean functional) {
        return deliveryRepository.findAllByFunctional(functional);
    }

    public Delivery getDeliveryById(@Nonnull Long deliveryId) {
        return deliveryRepository.findById(deliveryId).orElseThrow(() -> new NoResultException("Delivery with id " + deliveryId + " does not exist"));
    }

    @Transactional
    public Delivery saveDelivery(@Nonnull Delivery delivery) {
        Person updatedPerson = personService.addDeliveredProducts(delivery.getPerson(), delivery.getQuantity());
        delivery.setPerson(updatedPerson);
        return deliveryRepository.save(delivery);
    }

    @Transactional
    public Delivery updateDelivery(@Nonnull Delivery delivery, @Nonnull Long deliveryId) {
        Delivery toUpdate = getDeliveryById(deliveryId);

        personService.removeDeliveredProducts(toUpdate.getPerson(), toUpdate.getQuantity());
        Person updatedPerson = personService.addDeliveredProducts(delivery.getPerson(), delivery.getQuantity());

        toUpdate.setDeliveredProduct(delivery.getDeliveredProduct());
        toUpdate.setQuantity(delivery.getQuantity());
        toUpdate.setBrand(delivery.getBrand());
        toUpdate.setDeliveryDate(delivery.getDeliveryDate());
        toUpdate.setSpecifications(delivery.getSpecifications());
        toUpdate.setFunctional(delivery.isFunctional());
        toUpdate.setCategory(delivery.getCategory());
        toUpdate.setPerson(updatedPerson);
        toUpdate.setUser(delivery.getUser());
        toUpdate.setState(delivery.getState());
        return deliveryRepository.save(toUpdate);
    }
}
