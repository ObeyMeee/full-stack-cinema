package ua.com.andromeda.session;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.com.andromeda.session.dto.SessionBuyTicketDto;
import ua.com.andromeda.session.dto.SessionDto;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/sessions")
public class SessionController {
    private final SessionService sessionService;

    @Autowired
    public SessionController(SessionService sessionService) {
        this.sessionService = sessionService;
    }

    @GetMapping
    public ResponseEntity<Map<UUID, List<SessionDto>>> getAll() {
        return new ResponseEntity<>(sessionService.getSessions(true), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SessionBuyTicketDto> getById(@PathVariable String id) {
        Optional<SessionBuyTicketDto> optionalSession = sessionService.findById(UUID.fromString(id));
        return optionalSession
                .map(session -> new ResponseEntity<>(session, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(null, HttpStatus.BAD_REQUEST));
    }
}
