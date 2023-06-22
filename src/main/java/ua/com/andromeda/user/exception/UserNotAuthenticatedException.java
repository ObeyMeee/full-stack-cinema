package ua.com.andromeda.user.exception;

import org.springframework.security.core.AuthenticationException;

public class UserNotAuthenticatedException extends AuthenticationException {
    public UserNotAuthenticatedException() {
        super("User is not authenticated");
    }
}
