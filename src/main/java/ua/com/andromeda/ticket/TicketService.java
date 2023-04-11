package ua.com.andromeda.ticket;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ua.com.andromeda.session.Session;
import ua.com.andromeda.session.SessionRepository;
import ua.com.andromeda.user.User;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TicketService {
    private final TicketRepository ticketRepository;
    private final SessionRepository sessionRepository;

    public void save(PurchaseDto purchaseDto, User user) {
        UUID sessionId = UUID.fromString(purchaseDto.getSessionId());
        Optional<Session> optionalSession = sessionRepository.findById(sessionId);
        LocalDateTime now = LocalDateTime.now();
        List<Ticket> tickets = purchaseDto.getTickets().stream().map(ticketDto -> {
                    Ticket ticket = new Ticket();
                    ticket.setSeat(ticketDto.getSeat());
                    ticket.setRow(ticketDto.getRow());
                    ticket.setPrice(ticketDto.getPrice());
                    ticket.setSession(optionalSession.get());
                    ticket.setUser(user);
                    ticket.setBoughtAt(now);
                    return ticket;
                }
        ).toList();
        ticketRepository.saveAll(tickets);
    }
}
