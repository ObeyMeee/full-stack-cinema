package ua.com.andromeda.session.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ua.com.andromeda.hall.Hall;
import ua.com.andromeda.ticket.TicketDto;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class SessionBuyTicketDto {
    private String title;
    private LocalDateTime startAt;
    private String image;
    private Hall hall;
    private List<TicketDto> boughtTickets;

    public SessionBuyTicketDto(String title, LocalDateTime startAt, String image, Hall hall) {
        this.title = title;
        this.startAt = startAt;
        this.image = image;
        this.hall = hall;
    }
}