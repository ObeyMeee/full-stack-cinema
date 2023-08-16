package ua.com.andromeda.purchase.dto;

import lombok.Getter;
import lombok.Setter;
import ua.com.andromeda.purchase.Purchase;
import ua.com.andromeda.session.Session;
import ua.com.andromeda.ticket.Ticket;
import ua.com.andromeda.ticket.dto.TicketDto;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class PurchaseProfileDto {
    private Long id;
    private LocalDateTime dealtAt;
    private String filmTitle;
    private LocalDateTime sessionStartAt;
    private List<TicketDto> tickets;

    public PurchaseProfileDto(Purchase purchase) {
        List<Ticket> tickets = purchase.getTickets();
        Session session = tickets.get(0).getSession();
        this.id = purchase.getId();
        this.dealtAt = purchase.getDealtAt();
        this.filmTitle = session.getFilm().getTitle();
        this.sessionStartAt = session.getStartAt();
        this.tickets = tickets.stream()
                .map(t -> new TicketDto(t.getRow(), t.getSeat(), t.getPrice()))
                .toList();
    }
}
