package ua.com.andromeda.film;

import java.util.UUID;

public class FilmNotFoundException extends RuntimeException {
    public FilmNotFoundException(UUID id) {
        super("Cannot find film with id='" + id + "'");
    }
}
