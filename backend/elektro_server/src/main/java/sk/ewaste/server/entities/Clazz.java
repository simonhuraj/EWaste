package sk.ewaste.server.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Entity(name = "class")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Clazz {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long classId;

    @Column(length = 10)
    private String name;

    @OneToMany
    @JoinColumn(name = "class_id", referencedColumnName = "classId")
    Set<Person> persons;
}
