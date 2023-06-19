package ua.com.andromeda.comment;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import ua.com.andromeda.film.Film;
import ua.com.andromeda.reaction.Reaction;

import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "comments")
@Getter
@Setter
@ToString
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private double mark;

    @Column(columnDefinition = "TEXT")
    private String review;
    private String username;

    @OneToMany(
            fetch = FetchType.EAGER,
            mappedBy = "comment",
            cascade = CascadeType.ALL
    )
    private List<Reaction> reactions;

    @ManyToOne
    @JoinColumn(name = "film_id", nullable = false)
    @JsonIgnore
    private Film film;
}