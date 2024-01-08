package ua.com.andromeda.country;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
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
@NoArgsConstructor
public class Country {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(unique = true, nullable = false)
    private String name;

    @ManyToMany(mappedBy = "countries")
    @JsonIgnore
    @ToString.Exclude
    private List<Film> films;

    public Country(String name) {
        this.name = name;
    }
}
