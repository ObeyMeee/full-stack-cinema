package ua.com.andromeda.purchase.dto;

import lombok.Getter;
import lombok.Setter;
import ua.com.andromeda.ticket.dto.TicketDto;

import java.util.List;

@Getter
@Setter
public class PurchaseDto {
    private List<TicketDto> tickets;
    private String sessionId;
}
