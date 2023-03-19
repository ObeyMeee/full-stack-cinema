package ua.com.andromeda.country;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import ua.com.andromeda.film.Film;

import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "countries")
@Getter
@Setter
@ToString
public class Country {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String name;

    @ManyToMany(mappedBy = "countries")
    @JsonIgnore
    private List<Film> films;
}
