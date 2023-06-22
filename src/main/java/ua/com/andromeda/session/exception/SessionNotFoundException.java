package ua.com.andromeda.session.exception;

import ua.com.andromeda.exception.NotFoundException;
import ua.com.andromeda.session.Session;

import java.util.UUID;

public class SessionNotFoundException extends NotFoundException {
    public SessionNotFoundException(UUID sessionId) {
        super(Session.class, sessionId);
    }
}
