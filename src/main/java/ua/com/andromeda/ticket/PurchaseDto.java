package ua.com.andromeda.ticket;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class PurchaseDto {
    private List<TicketDto> tickets;
    private String sessionId;
}
