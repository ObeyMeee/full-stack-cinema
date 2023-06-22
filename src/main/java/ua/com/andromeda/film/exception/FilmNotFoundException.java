package ua.com.andromeda.film.exception;

import ua.com.andromeda.exception.NotFoundException;
import ua.com.andromeda.film.Film;

import java.util.UUID;

public class FilmNotFoundException extends NotFoundException {
    public FilmNotFoundException(UUID id) {
        super(Film.class, id);
    }
}
