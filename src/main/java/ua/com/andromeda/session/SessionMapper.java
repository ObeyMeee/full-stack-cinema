package ua.com.andromeda.session;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;
import ua.com.andromeda.hall.Hall;
import ua.com.andromeda.hall.HallNotFoundException;
import ua.com.andromeda.hall.HallRepository;
import ua.com.andromeda.session.dto.SessionNewFilmDto;

@Component
@AllArgsConstructor
public class SessionMapper {
    private final HallRepository hallRepository;

    public Session toModel(SessionNewFilmDto sessionDto) {
        int hallNumber = sessionDto.getHall();
        Hall hall = hallRepository.findByNumber(hallNumber).orElseThrow(() -> new HallNotFoundException(hallNumber));
        Session session = new Session();
        session.setEnabled(false);
        session.setGoodRowPrice(sessionDto.getGoodRowPrice());
        session.setLuxRowPrice(sessionDto.getLuxRowPrice());
        session.setStartAt(sessionDto.getStartAt());
        session.setHall(hall);
        return session;
    }
}
