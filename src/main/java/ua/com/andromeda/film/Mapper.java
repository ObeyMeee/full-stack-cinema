package ua.com.andromeda.film;

import org.springframework.stereotype.Component;
import ua.com.andromeda.film.dto.PosterDto;
import ua.com.andromeda.session.SessionIdAndStartAtProjection;
import ua.com.andromeda.session.SessionRepository;

import java.util.List;
import java.util.UUID;

@Component
public class Mapper {
    private final SessionRepository sessionRepository;

    public Mapper(SessionRepository sessionRepository) {
        this.sessionRepository = sessionRepository;
    }

    public PosterDto toPosterDto(Film film) {
        UUID id = film.getId();
        List<SessionIdAndStartAtProjection> sessions = sessionRepository.findByFilm_Id(id);
        return new PosterDto(
                id,
                film.getName(),
                film.getMedia(),
                sessions
        );
    }
}
