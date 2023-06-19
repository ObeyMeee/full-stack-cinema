package ua.com.andromeda.session;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ua.com.andromeda.session.dto.SessionBuyTicketDto;
import ua.com.andromeda.session.dto.SessionDto;
import ua.com.andromeda.ticket.TicketRepository;
import ua.com.andromeda.ticket.dto.TicketDto;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class SessionService {
    private final SessionRepository sessionRepository;
    private final TicketRepository ticketRepository;

    public Optional<SessionBuyTicketDto> findById(UUID id) {
        Optional<SessionBuyTicketDto> optionalSessionDto = sessionRepository.findSessionBuyTicketDtoById(id);
        optionalSessionDto.ifPresent(session -> {
            List<TicketDto> boughtTickets = ticketRepository.findBySessionId(id);
            session.setBoughtTickets(boughtTickets);
        });
        return optionalSessionDto;
    }

    public List<SessionDto> findAllByFilmId(String filmId) {
        return sessionRepository.findAllByFilmId(UUID.fromString(filmId))
                .map(SessionDto::new)
                .toList();
    }
}
