package ua.com.andromeda.session;

import lombok.RequiredArgsConstructor;
import org.springframework.data.util.Streamable;
import org.springframework.stereotype.Service;
import ua.com.andromeda.session.dto.SessionBuyTicketDto;
import ua.com.andromeda.session.dto.SessionDto;
import ua.com.andromeda.ticket.TicketDto;
import ua.com.andromeda.ticket.TicketRepository;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SessionService {
    private final SessionRepository sessionRepository;
    private final TicketRepository ticketRepository;

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
        Optional<SessionBuyTicketDto> optionalSessionDto = sessionRepository.findSessionBuyTicketDtoById(id);
        optionalSessionDto.ifPresent(session -> {
            List<TicketDto> boughtTickets = ticketRepository.findBySessionId(id);
            session.setBoughtTickets(boughtTickets);
        });
        return optionalSessionDto;
    }
}
