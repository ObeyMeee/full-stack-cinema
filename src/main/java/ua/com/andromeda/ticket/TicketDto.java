package ua.com.andromeda.ticket;

import lombok.Getter;
import lombok.Setter;
import ua.com.andromeda.hall.RowType;

@Getter
@Setter
public class TicketDto {
    private int row;
    private int seat;
    private RowType type;
    private int price;
}