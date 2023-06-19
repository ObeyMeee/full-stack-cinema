package ua.com.andromeda.comment;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;

    public List<Comment> findAllByFilmId(String filmId) {
        return commentRepository.findAllByFilmId(UUID.fromString(filmId));
    }
}
