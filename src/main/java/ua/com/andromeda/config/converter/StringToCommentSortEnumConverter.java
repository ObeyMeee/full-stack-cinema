package ua.com.andromeda.config.converter;

import jakarta.validation.constraints.NotNull;
import org.springframework.core.convert.converter.Converter;
import ua.com.andromeda.comment.CommentSort;

public class StringToCommentSortEnumConverter implements Converter<String, CommentSort> {
    @Override
    public CommentSort convert(@NotNull String source) {
        try {
            return CommentSort.valueOf(source);
        } catch (IllegalArgumentException ex) {
            return CommentSort.RECENT;
        }
    }
}
