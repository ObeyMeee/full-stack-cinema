package ua.com.andromeda.session;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import ua.com.andromeda.session.dto.SessionBuyTicketDto;
import ua.com.andromeda.session.dto.SessionDto;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
public class SessionController {
    private final SessionService sessionService;

    @GetMapping("sessions/{id}")
    public ResponseEntity<SessionBuyTicketDto> findById(@PathVariable String id) {
        Optional<SessionBuyTicketDto> optionalSession = sessionService.findById(UUID.fromString(id));
        return optionalSession
                .map(ResponseEntity::ok)
                .orElseGet(() -> new ResponseEntity<>(null, HttpStatus.BAD_REQUEST));
    }

    @GetMapping("films/{filmId}/sessions")
    public ResponseEntity<List<SessionDto>> findAllByFilmId(@PathVariable String filmId) {
        List<SessionDto> sessions = sessionService.findAllByFilmId(filmId);
        return new ResponseEntity<>(sessions, HttpStatus.OK);
    }
}
