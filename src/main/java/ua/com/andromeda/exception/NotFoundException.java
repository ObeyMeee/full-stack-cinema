package ua.com.andromeda.exception;

public abstract class NotFoundException extends RuntimeException {
    protected NotFoundException(Class<?> clazz, Object id) {
        super("Couldn't find " + clazz.getSimpleName() + " with id = '" + id + "'");
    }

    protected NotFoundException(String message) {
        super(message);
    }
}
