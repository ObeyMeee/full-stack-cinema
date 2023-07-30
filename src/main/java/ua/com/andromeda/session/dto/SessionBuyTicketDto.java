package ua.com.andromeda.session.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ua.com.andromeda.hall.Hall;
import ua.com.andromeda.ticket.dto.TicketDto;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class SessionBuyTicketDto {
    private String title;
    private LocalDateTime startAt;
    private int duration;
    private String image;
    private Hall hall;
    private List<TicketDto> boughtTickets;

    public SessionBuyTicketDto(String title, LocalDateTime startAt, int duration, String image, Hall hall) {
        this.title = title;
        this.duration = duration;
        this.startAt = startAt;
        this.image = image;
        this.hall = hall;
    }
}