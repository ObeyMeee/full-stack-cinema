package ua.com.andromeda.ticket;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ua.com.andromeda.common.EmailSender;
import ua.com.andromeda.session.Session;
import ua.com.andromeda.session.SessionRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TicketService {
    private final TicketRepository ticketRepository;
    private final SessionRepository sessionRepository;
    private final EmailSender emailSender;


    public void save(PurchaseDto purchaseDto, String username) {
        UUID sessionId = UUID.fromString(purchaseDto.getSessionId());
        LocalDateTime now = LocalDateTime.now();
        Session session = sessionRepository.findById(sessionId).get();
        List<Ticket> tickets = purchaseDto.getTickets().stream().map(ticketDto -> {
                    Ticket ticket = new Ticket();
                    ticket.setSeat(ticketDto.getSeat());
                    ticket.setRow(ticketDto.getRow());
                    ticket.setPrice(ticketDto.getPrice());
                    ticket.setSession(session);
                    ticket.setUsername(username);
                    ticket.setBoughtAt(now);
                    return ticket;
                }
        ).toList();
        emailSender.sendTicketsEmail(username, tickets);
        ticketRepository.saveAll(tickets);
    }

    public List<TicketProfileDto> findAllByUsername(String username) {
        return ticketRepository.findByUsername(username);
    }
}
