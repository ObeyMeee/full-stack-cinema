package ua.com.andromeda.media;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import ua.com.andromeda.filmdetails.FilmDetails;

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
    private String poster;

    @Column(columnDefinition = "TEXT")
    private String trailer;

    @OneToOne(mappedBy = "media")
    private FilmDetails filmDetails;
}
