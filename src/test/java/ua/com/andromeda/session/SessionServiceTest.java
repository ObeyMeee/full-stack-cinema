package ua.com.andromeda.session;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.util.Streamable;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import ua.com.andromeda.film.Film;
import ua.com.andromeda.hall.Hall;
import ua.com.andromeda.hall.Row;
import ua.com.andromeda.session.dto.SessionBuyTicketDto;
import ua.com.andromeda.session.dto.SessionShortInfoDto;
import ua.com.andromeda.session.exception.SessionNotFoundException;
import ua.com.andromeda.ticket.TicketRepository;
import ua.com.andromeda.ticket.dto.TicketDto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@SpringBootTest
@ExtendWith(SpringExtension.class)
class SessionServiceTest {

    @Autowired
    SessionService target;

    @MockBean
    SessionRepository sessionRepository;

    @MockBean
    TicketRepository ticketRepository;

    private UUID getUUID() {
        return UUID.randomUUID();
    }

    @Test
    void findById_invalidUUID_shouldThrowIllegalArgumentException() {
        assertThrows(IllegalArgumentException.class, () -> target.findById("invalid uuid"));
    }

    @Test
    void findById_nonExistingId_shouldThrowSessionNotFoundException() {
        UUID sessionId = getUUID();
        when(sessionRepository.findSessionBuyTicketDtoById(sessionId)).thenReturn(Optional.empty());

        assertThrows(SessionNotFoundException.class, () -> target.findById(sessionId.toString()));
        verify(sessionRepository, times(1)).findSessionBuyTicketDtoById(sessionId);
        verify(ticketRepository, never()).findBySessionId(any(UUID.class));
    }


    @Test
    void findById_existingId_shouldReturnSessionBuyTicketDto() {
        UUID sessionId = getUUID();
        List<TicketDto> ticketDtos = List.of(new TicketDto(), new TicketDto());
        SessionBuyTicketDto expected = new SessionBuyTicketDto();
        when(sessionRepository.findSessionBuyTicketDtoById(sessionId)).thenReturn(Optional.of(expected));
        when(ticketRepository.findBySessionId(sessionId)).thenReturn(ticketDtos);

        SessionBuyTicketDto actual = target.findById(sessionId.toString());

        verify(sessionRepository, times(1)).findSessionBuyTicketDtoById(sessionId);
        verify(ticketRepository, times(1)).findBySessionId(sessionId);
        assertEquals(expected, actual);
        assertEquals(ticketDtos, actual.getBoughtTickets());
    }

    @Test
    void findAllByFilmId_existingFilmId_shouldReturnList() {
        UUID filmId = getUUID();
        Film film = new Film();
        film.setId(filmId);
        Session session = getSession(film);
        when(sessionRepository.findAllByFilmId(filmId)).thenReturn(Streamable.of(session));

        List<SessionShortInfoDto> result = target.findAllByFilmId(filmId.toString());

        assertEquals(1, result.size());
        SessionShortInfoDto dto = result.get(0);
        assertEquals(session.getId(), dto.getId());
        assertEquals(session.getStartAt(), dto.getStartAt());
        assertEquals(session.getHall().getRows().get(0).getPrice(), dto.getMinPrice());
    }

    private Session getSession(Film film) {
        Session session = new Session();
        session.setId(getUUID());
        session.setStartAt(LocalDateTime.now());
        session.setEnabled(true);
        session.setFilm(film);
        Hall hall = new Hall();
        hall.setRows(List.of(new Row(), new Row()));
        session.setHall(hall);
        return session;
    }

    @Test
    void findAllByFilmId_existingFilmId_shouldReturnEmptyList() {
        UUID filmId = getUUID();
        when(sessionRepository.findAllByFilmId(filmId)).thenReturn(Streamable.empty());

        List<SessionShortInfoDto> actual = target.findAllByFilmId(filmId.toString());

        verify(sessionRepository, times(1)).findAllByFilmId(filmId);
        assertEquals(actual.size(), 0);
    }
}