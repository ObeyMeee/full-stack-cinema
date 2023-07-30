package ua.com.andromeda.session;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import ua.com.andromeda.session.dto.SessionBuyTicketDto;
import ua.com.andromeda.session.dto.SessionShortInfoDto;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class SessionController {
    private final SessionService sessionService;

    @GetMapping("sessions/{id}")
    public ResponseEntity<SessionBuyTicketDto> findById(@PathVariable String id) {
        return ResponseEntity.ok(sessionService.findById(id));
    }

    @GetMapping("films/{filmId}/sessions")
    public ResponseEntity<List<SessionShortInfoDto>> findAllByFilmId(@PathVariable String filmId) {
        return ResponseEntity.ok(sessionService.findAllByFilmId(filmId));
    }
}
