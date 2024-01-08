package ua.com.andromeda.session.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ua.com.andromeda.session.Session;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SessionShortInfoDto {
    private UUID id;
    private LocalDateTime startAt;
    private int minPrice;

    public SessionShortInfoDto(Session session) {
        this.id = session.getId();
        this.startAt = session.getStartAt();
        this.minPrice = session.getGoodRowPrice();
    }
}
