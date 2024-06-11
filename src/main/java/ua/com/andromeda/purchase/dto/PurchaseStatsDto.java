package ua.com.andromeda.purchase.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ua.com.andromeda.purchase.Purchase;
import ua.com.andromeda.ticket.dto.TicketStatsDto;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class PurchaseStatsDto {
    private String username;
    private LocalDateTime dealtAt;
    private List<TicketStatsDto> tickets;

    public PurchaseStatsDto(Purchase purchase) {
        this.username = purchase.getUsername();
        this.dealtAt = purchase.getDealtAt();
        this.tickets = purchase
                .getTickets()
                .stream()
                .map(TicketStatsDto::new)
                .toList();
    }
}
