package ua.com.andromeda.genre;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import ua.com.andromeda.film.Film;

import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "genres")
@Getter
@Setter
@ToString
public class Genre {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String name;

    @ManyToMany(mappedBy = "genres")
    @JsonIgnore
    private List<Film> films;
}
