package ua.com.andromeda.session.dto;

import lombok.Getter;
import lombok.Setter;
import ua.com.andromeda.session.Session;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
public class SessionStatsDto {
    private String title;
    private LocalDateTime startAt;
    private UUID filmId;
    private int hall;

    public SessionStatsDto(Session session) {
        this.title = session.getFilm().getTitle();
        this.hall = session.getHall().getNumber();
        this.startAt = session.getStartAt();
        this.filmId = session.getFilm().getId();
    }
}
