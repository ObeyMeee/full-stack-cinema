package ua.com.andromeda.reaction.exception;

import ua.com.andromeda.exception.NotFoundException;

public class ReactionNotFoundException extends NotFoundException {
    public ReactionNotFoundException(String message) {
        super(message);
    }
}
