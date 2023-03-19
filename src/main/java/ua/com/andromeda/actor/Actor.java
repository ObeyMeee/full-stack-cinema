package ua.com.andromeda.actor;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import ua.com.andromeda.film.Film;

import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "actors")
@Getter
@Setter
@ToString
public class Actor {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "full_name")
    private String fullName;

    @ManyToMany(mappedBy = "actors")
    @JsonIgnore
    private List<Film> films;
}
