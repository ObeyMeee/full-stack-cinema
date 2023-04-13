package ua.com.andromeda.comment;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import ua.com.andromeda.film.Film;

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

    @ManyToOne
    @JoinColumn(name = "film_id", nullable = false)
    private Film film;
}