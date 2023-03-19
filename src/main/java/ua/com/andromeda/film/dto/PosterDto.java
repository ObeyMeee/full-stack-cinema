package ua.com.andromeda.film.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ua.com.andromeda.session.SessionIdAndStartAtProjection;
import ua.com.andromeda.media.Media;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PosterDto {
    private UUID filmId;
    private String name;
    private Media media;
    private List<SessionIdAndStartAtProjection> sessions;
}
