package ua.com.andromeda.film;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;
import ua.com.andromeda.comment.Comment;
import ua.com.andromeda.country.Country;
import ua.com.andromeda.crew.CrewMember;
import ua.com.andromeda.genre.Genre;
import ua.com.andromeda.media.Media;
import ua.com.andromeda.session.Session;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "films")
@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Film {
    private static final int FIRST_FILM_PRODUCTION_YEAR = 1895;

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @NotBlank
    private String title;

    @Column(columnDefinition = "text")
    @NotBlank
    private String description;

    private boolean enabled;

    @NotBlank
    private String language;

    @Min(0)
    @Column(name = "age_restriction")
    private int ageRestriction;

    @Min(0)
    private int duration;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate startReleaseAt;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate endReleaseAt;

    @Column(name = "production_year")
    @Min(FIRST_FILM_PRODUCTION_YEAR)
    private int productionYear;

    @ManyToMany(
            fetch = FetchType.EAGER,
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
            fetch = FetchType.EAGER,
            cascade = {CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH}
    )
    @JoinTable(
            name = "films_crew",
            joinColumns = @JoinColumn(name = "film_id"),
            inverseJoinColumns = @JoinColumn(name = "crew_member_id")
    )
    private Set<CrewMember> crew;

    @ManyToMany(
            fetch = FetchType.EAGER,
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