package ua.com.andromeda.film;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import ua.com.andromeda.filmdetails.FilmDetails;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "films")
@Getter
@Setter
@ToString
public class Film {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String name;
    private LocalDateTime startAt;
    private boolean enabled;

    @ManyToOne
    private FilmDetails details;
}
