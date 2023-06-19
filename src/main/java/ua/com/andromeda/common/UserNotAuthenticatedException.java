package ua.com.andromeda.common;

import org.springframework.security.core.AuthenticationException;

public class UserNotAuthenticatedException extends AuthenticationException {
    public UserNotAuthenticatedException() {
        super("User is not authenticated");
    }
}
