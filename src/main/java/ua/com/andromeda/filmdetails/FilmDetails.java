package ua.com.andromeda.filmdetails;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import ua.com.andromeda.actor.Actor;
import ua.com.andromeda.country.Country;
import ua.com.andromeda.genre.Genre;
import ua.com.andromeda.media.Media;

import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
@ToString
public class FilmDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String description;
    private String director;
    private int duration;
    @Column(name = "production_year")
    private int productionYear;

    @ManyToMany
    @JoinTable(
            name = "film_details_countries",
            joinColumns = @JoinColumn(name = "film_details_id"),
            inverseJoinColumns = @JoinColumn(name = "country_id")
    )
    private List<Country> countries;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "media_id")
    private Media media;

    @ManyToMany
    @JoinTable(
            name = "film_details_actors",
            joinColumns = @JoinColumn(name = "film_details_id"),
            inverseJoinColumns = @JoinColumn(name = "actor_id")
    )
    private List<Actor> actors;

    @ManyToMany
    @JoinTable(
            name = "film_details_genres",
            joinColumns = @JoinColumn(name = "film_details_id"),
            inverseJoinColumns = @JoinColumn(name = "genre_id")
    )
    private List<Genre> genres;


}
