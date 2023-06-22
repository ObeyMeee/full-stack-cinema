package ua.com.andromeda.comment.exception;

import ua.com.andromeda.comment.Comment;
import ua.com.andromeda.exception.NotFoundException;

public class CommentNotFoundException extends NotFoundException {
    public CommentNotFoundException(String id) {
        super(Comment.class, id);
    }
}
