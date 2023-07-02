package sk.ewaste.server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sk.ewaste.server.entities.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
}