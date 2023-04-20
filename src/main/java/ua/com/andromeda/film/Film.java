package ua.com.andromeda.film;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import ua.com.andromeda.actor.Actor;
import ua.com.andromeda.comment.Comment;
import ua.com.andromeda.country.Country;
import ua.com.andromeda.genre.Genre;
import ua.com.andromeda.media.Media;
import ua.com.andromeda.session.Session;

import java.util.List;
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

    private boolean enabled;
    private String title;

    private String description;
    private String director;
    private int duration;
    @Column(name = "production_year")
    private int productionYear;

    @ManyToMany(
            cascade = {CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH}
    )
    @JoinTable(
            name = "films_countries",
            joinColumns = @JoinColumn(name = "film_id"),
            inverseJoinColumns = @JoinColumn(name = "country_id")
    )
    private List<Country> countries;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "media_id")
    private Media media;

    @ManyToMany(
            cascade = {CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH}
    )
    @JoinTable(
            name = "films_actors",
            joinColumns = @JoinColumn(name = "film_id"),
            inverseJoinColumns = @JoinColumn(name = "actor_id")
    )
    private List<Actor> actors;

    @ManyToMany(
            cascade = {CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH}
    )
    @JoinTable(
            name = "films_genres",
            joinColumns = @JoinColumn(name = "film_id"),
            inverseJoinColumns = @JoinColumn(name = "genre_id")
    )
    private List<Genre> genres;

    @OneToMany(mappedBy = "film")
    @JsonIgnore
    @ToString.Exclude
    private List<Session> sessions;

    @OneToMany(mappedBy = "film")
    @JsonIgnore
    @ToString.Exclude
    private List<Comment> comments;
}