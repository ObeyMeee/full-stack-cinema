package ua.com.andromeda.session;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Streamable;
import org.springframework.stereotype.Service;
import ua.com.andromeda.session.dto.SessionBuyTicketDto;
import ua.com.andromeda.session.dto.SessionDto;

import java.util.List;
import java.util.Map;
import java.util.Optional;
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
        Streamable<Session> sessions = sessionRepository.findAllByEnabledEquals(enabled);
        return sessions.stream()
                .collect(Collectors.toMap(
                        session -> session.getFilm().getId(),
                        session ->
                                sessions.stream()
                                        .filter(s -> session.getFilm().getId().equals(s.getFilm().getId()))
                                        .map(SessionDto::new)
                                        .toList(),
                        (s1, s2) -> s1
                ));
    }

    public List<SessionDto> getSessionByFilmId(UUID filmId) {
        return sessionRepository.findAllByFilmId(filmId)
                .map(SessionDto::new)
                .toList();
    }

    public Optional<SessionBuyTicketDto> findById(UUID id) {
        return sessionRepository.findSessionBuyTicketDtoById(id);
    }
}
