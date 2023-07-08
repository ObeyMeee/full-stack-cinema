package ua.com.andromeda.ticket;

import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.stereotype.Service;
import ua.com.andromeda.common.EmailSender;
import ua.com.andromeda.common.PdfCreator;
import ua.com.andromeda.common.QRCodeGenerator;
import ua.com.andromeda.session.Session;
import ua.com.andromeda.session.SessionRepository;
import ua.com.andromeda.session.exception.SessionNotFoundException;
import ua.com.andromeda.ticket.dto.PurchaseDto;
import ua.com.andromeda.ticket.dto.TicketDto;
import ua.com.andromeda.ticket.dto.TicketProfileDto;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.nio.file.Files;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TicketService {
    private final TicketRepository ticketRepository;
    private final SessionRepository sessionRepository;
    private final EmailSender emailSender;
    private final PdfCreator pdfCreator;
    private final QRCodeGenerator qrCodeGenerator;

    public List<TicketProfileDto> findAllByUsername(String username) {
        return ticketRepository.findByUsername(username);
    }

    @SneakyThrows
    public void save(PurchaseDto purchaseDto, String username) {
        UUID sessionId = UUID.fromString(purchaseDto.getSessionId());
        Session session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new SessionNotFoundException(sessionId));
        List<Ticket> tickets = purchaseDto.getTickets().stream()
                .map(ticketDto -> getTicket(username, session, ticketDto))
                .toList();
        ticketRepository.saveAll(tickets);
        List<ByteArrayOutputStream> qrCodesBytesArray = qrCodeGenerator.generateQRCodesBytesArray(tickets, 110, 110);
        File file = pdfCreator.createTicketsFile(tickets, qrCodesBytesArray);
        emailSender.sendTicketsEmail(username, tickets, file);
        Files.deleteIfExists(file.toPath());
    }

    private Ticket getTicket(String username, Session session, TicketDto ticketDto) {
        Ticket ticket = new Ticket();
        ticket.setSeat(ticketDto.getSeat());
        ticket.setRow(ticketDto.getRow());
        ticket.setPrice(ticketDto.getPrice());
        ticket.setSession(session);
        ticket.setUsername(username);
        ticket.setBoughtAt(LocalDateTime.now());
        return ticket;
    }
}
