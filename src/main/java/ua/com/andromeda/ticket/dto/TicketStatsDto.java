package ua.com.andromeda.ticket.dto;

import lombok.Getter;
import lombok.Setter;
import ua.com.andromeda.session.dto.SessionStatsDto;
import ua.com.andromeda.ticket.Ticket;

@Getter
@Setter
public class TicketStatsDto {
    private int price;
    private int row;
    private int seat;
    private SessionStatsDto session;

    public TicketStatsDto(Ticket ticket) {
        this.price = ticket.getPrice();
        this.row = ticket.getRow();
        this.seat = ticket.getSeat();
        this.session = new SessionStatsDto(ticket.getSession());
    }
}
