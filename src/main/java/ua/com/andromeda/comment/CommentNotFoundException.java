package ua.com.andromeda.comment;

public class CommentNotFoundException extends RuntimeException {
    public CommentNotFoundException(String id) {
        super("Cannot find comment with id=" + id);
    }
}
