package ua.com.andromeda.media;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import ua.com.andromeda.film.Film;

import java.util.UUID;

@Entity
@Getter
@Setter
@ToString
public class Media {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(columnDefinition = "TEXT")
    private String image;

    @Column(columnDefinition = "TEXT")
    private String trailer;

    @OneToOne(mappedBy = "media")
    @JsonIgnore
    @ToString.Exclude
    private Film film;
}
