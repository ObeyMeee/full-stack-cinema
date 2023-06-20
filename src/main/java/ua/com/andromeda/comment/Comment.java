package ua.com.andromeda.comment;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import ua.com.andromeda.film.Film;
import ua.com.andromeda.reaction.Reaction;

import java.time.LocalDateTime;
import java.util.ArrayList;
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

    @NotNull(message = "Mark is required")
    private Double mark;

    @Column(columnDefinition = "TEXT")
    private String review;

    @NotNull(message = "Username is required")
    private String username;

    @OneToMany(
            fetch = FetchType.EAGER,
            mappedBy = "comment",
            cascade = CascadeType.ALL
    )
    private List<Reaction> reactions = new ArrayList<>();

    @NotNull
    private LocalDateTime wroteAt;

    @ManyToOne
    @JoinColumn(name = "film_id", nullable = false)
    @JsonIgnore
    private Film film;
}