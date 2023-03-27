package ua.com.andromeda.session.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ua.com.andromeda.session.SessionProjection;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SessionDto {
    private UUID id;
    private LocalDateTime startAt;

    public SessionDto(SessionProjection sessionProjection) {
        this.id = sessionProjection.getId();
        this.startAt = sessionProjection.getStartAt();
    }
}
