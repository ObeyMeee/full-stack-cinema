package ua.com.andromeda.hall;

import ua.com.andromeda.exception.NotFoundException;

public class HallNotFoundException extends NotFoundException {
    public HallNotFoundException(int number) {
        super("Could not find hall with number " + number);
    }
}
