package ua.com.andromeda.purchase;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.stereotype.Service;
import ua.com.andromeda.common.EmailSender;
import ua.com.andromeda.common.PdfCreator;
import ua.com.andromeda.common.QRCodeGenerator;
import ua.com.andromeda.purchase.dto.OrderNumberResponse;
import ua.com.andromeda.purchase.dto.PurchaseDto;
import ua.com.andromeda.purchase.dto.PurchaseProfileDto;
import ua.com.andromeda.session.Session;
import ua.com.andromeda.session.SessionRepository;
import ua.com.andromeda.session.exception.SessionNotFoundException;
import ua.com.andromeda.ticket.Ticket;
import ua.com.andromeda.user.exception.UserNotAuthenticatedException;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.nio.file.Files;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PurchaseService {
    private final PurchaseRepository purchaseRepository;
    private final SessionRepository sessionRepository;
    private final EmailSender emailSender;
    private final PdfCreator pdfCreator;
    private final QRCodeGenerator qrCodeGenerator;

    @Transactional
    public List<PurchaseProfileDto> findAllByUsername(String username) {
        if (username == null) {
            throw new UserNotAuthenticatedException();
        }
        return purchaseRepository.findAllByUsernameOrderByDealtAtDesc(username)
                .map(PurchaseProfileDto::new)
                .toList();
    }

    @SneakyThrows
    public OrderNumberResponse save(PurchaseDto purchaseDto, String username) {
        if (username == null) {
            throw new UserNotAuthenticatedException();
        }

        if (purchaseDto.getTickets().isEmpty()) {
            throw new IllegalArgumentException("No tickets");
        }

        UUID sessionId = UUID.fromString(purchaseDto.getSessionId());
        Session session = findSession(sessionId);
        Purchase purchase = new Purchase(purchaseDto, username, session);
        purchaseRepository.save(purchase);
        List<Ticket> tickets = purchase.getTickets();
        List<ByteArrayOutputStream> qrCodeBytes = qrCodeGenerator.generateQRCodesBytesArray(tickets, 110, 110);
        File file = pdfCreator.createTicketsFile(tickets, qrCodeBytes);
        emailSender.sendTicketsEmail(username, tickets, file);
        Files.deleteIfExists(file.toPath());
        return new OrderNumberResponse(purchase.getId());
    }

    private Session findSession(UUID sessionId) {
        return sessionRepository.findById(sessionId)
                .orElseThrow(() -> new SessionNotFoundException(sessionId));
    }
}
