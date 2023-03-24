package ua.com.andromeda.film;

import org.springframework.stereotype.Component;
import ua.com.andromeda.film.dto.PosterDto;

@Component
public class Mapper {

    public PosterDto toPosterDto(Film film) {
        return new PosterDto(film.getId(), film.getTitle(), film.getMedia());
    }
}
