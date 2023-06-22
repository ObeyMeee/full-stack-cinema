package ua.com.andromeda.session;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ua.com.andromeda.session.dto.SessionBuyTicketDto;
import ua.com.andromeda.session.dto.SessionShortInfoDto;
import ua.com.andromeda.session.exception.SessionNotFoundException;
import ua.com.andromeda.ticket.TicketRepository;
import ua.com.andromeda.ticket.dto.TicketDto;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class SessionService {
    private final SessionRepository sessionRepository;
    private final TicketRepository ticketRepository;

    public SessionBuyTicketDto findById(UUID id) {
        SessionBuyTicketDto sessionBuyTicketDto = sessionRepository.findSessionBuyTicketDtoById(id)
                .orElseThrow(() -> new SessionNotFoundException(id));
        List<TicketDto> boughtTickets = ticketRepository.findBySessionId(id);
        sessionBuyTicketDto.setBoughtTickets(boughtTickets);
        return sessionBuyTicketDto;
    }

    public List<SessionShortInfoDto> findAllByFilmId(String filmId) {
        return sessionRepository.findAllByFilmId(UUID.fromString(filmId))
                .map(SessionShortInfoDto::new)
                .toList();
    }
}
