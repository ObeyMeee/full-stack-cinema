package ua.com.andromeda.session;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ua.com.andromeda.session.dto.SessionBuyTicketDto;
import ua.com.andromeda.session.dto.SessionDto;
import ua.com.andromeda.ticket.TicketDto;
import ua.com.andromeda.ticket.TicketRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class SessionService {
    private final SessionRepository sessionRepository;
    private final TicketRepository ticketRepository;

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
