package ua.com.andromeda.session;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class SessionService {
    private final SessionRepository sessionRepository;

    @Autowired
    public SessionService(SessionRepository sessionRepository) {
        this.sessionRepository = sessionRepository;
    }

    public Map<UUID, List<SessionDto>> getSessions(boolean enabled) {
        List<SessionProjection> sessions = sessionRepository.findAllByEnabledEquals(enabled);
        return sessions.stream()
                .collect(Collectors.toMap(
                        SessionProjection::getFilmId,
                        sessionProjection ->
                                sessions.stream()
                                        .filter(s -> sessionProjection.getFilmId().equals(s.getFilmId()))
                                        .map(SessionDto::new)
                                        .toList(),
                        (s1, s2) -> s1
                ));
    }

    public List<SessionDto> getSessionByFilmId(UUID filmId) {
        return sessionRepository.findAllByFilmId(filmId);
    }
}
