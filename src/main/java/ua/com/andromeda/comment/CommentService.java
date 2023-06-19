package ua.com.andromeda.comment;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;

    public Page<Comment> findAllByFilmId(String filmId, int page, int size) {
        UUID id = UUID.fromString(filmId);
        Pageable pageable = PageRequest.of(page, size);
        return commentRepository.findAllByFilmId(id, pageable);
    }
}
