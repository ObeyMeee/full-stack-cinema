package ua.com.andromeda.session.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ua.com.andromeda.hall.Hall;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SessionBuyTicketDto {
    private String title;
    private LocalDateTime startAt;
    private String image;
    private Hall hall;
}
