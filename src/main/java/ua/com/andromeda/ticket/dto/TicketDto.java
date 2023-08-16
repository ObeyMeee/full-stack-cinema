package ua.com.andromeda.ticket.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ua.com.andromeda.hall.RowType;

@Getter
@Setter
@NoArgsConstructor
public class TicketDto {
    private int row;
    private int seat;
    private RowType type;
    private int price;

    public TicketDto(int row, int seat) {
        this.row = row;
        this.seat = seat;
    }

    public TicketDto(int row, int seat, int price) {
        this.row = row;
        this.seat = seat;
        this.price = price;
    }
}