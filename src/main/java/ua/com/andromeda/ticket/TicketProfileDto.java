package ua.com.andromeda.ticket;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TicketProfileDto {
    private TicketDto ticket;
    private LocalDateTime boughtAt;
    private LocalDateTime sessionStartAt;
    private String filmTitle;
    private UUID sessionId;
}