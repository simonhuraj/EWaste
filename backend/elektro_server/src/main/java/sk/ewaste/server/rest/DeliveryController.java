package sk.ewaste.server.rest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sk.ewaste.server.entities.Delivery;
import sk.ewaste.server.services.DeliveryService;

import java.util.List;

@RestController
@RequestMapping("/delivery")
public class DeliveryController {

    private final DeliveryService deliveryService;

    public DeliveryController(DeliveryService deliveryService) {
        this.deliveryService = deliveryService;
    }

    @GetMapping
    public ResponseEntity<List<Delivery>> getAllDeliveries() {
        return ResponseEntity.ok(deliveryService.getAllDeliveries());
    }

    @GetMapping("/person/{id}")
    public ResponseEntity<List<Delivery>> getAllDeliveriesByPerson(@PathVariable("id") Long id) {
        return ResponseEntity.ok(deliveryService.getAllDeliveriesByPersonId(id));
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<List<Delivery>> getAllDeliveriesByUser(@PathVariable("id") Long id) {
        return ResponseEntity.ok(deliveryService.getAllDeliveriesByUserId(id));
    }

    @GetMapping("/functional/{functional}")
    public ResponseEntity<List<Delivery>> getAllDeliveriesByFunctional(@PathVariable("functional") boolean functional) {
        return ResponseEntity.ok(deliveryService.getAllByFunctional(functional));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Delivery> getDeliveriesById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(deliveryService.getDeliveryById(id));
    }

    @PostMapping
    public ResponseEntity<Delivery> saveDelivery(@RequestBody Delivery delivery) {
        return ResponseEntity.status(HttpStatus.CREATED).body(deliveryService.saveDelivery(delivery));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Delivery> updateDelivery(@RequestBody Delivery delivery, @PathVariable("id") Long id) {
        return ResponseEntity.ok(deliveryService.updateDelivery(delivery, id));
    }
}
