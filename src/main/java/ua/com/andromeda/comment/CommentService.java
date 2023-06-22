package ua.com.andromeda.comment;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import ua.com.andromeda.film.Film;
import ua.com.andromeda.film.FilmRepository;
import ua.com.andromeda.film.exception.FilmNotFoundException;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final FilmRepository filmRepository;

    public Page<Comment> findAllByFilmId(String filmId, int page, int size, CommentSort sort, Sort.Direction direction) {
        UUID id = UUID.fromString(filmId);
        Pageable pageable = PageRequest.of(page, size);
        if (sort.equals(CommentSort.RECENT)) {
            pageable = PageRequest.of(page, size, Sort.by(direction, "wroteAt"));
            return commentRepository.findAllByFilmId(id, pageable);
        }
        if (direction.equals(Sort.Direction.ASC)) {
            return commentRepository.findCommentsOrderByReactionsDifferenceAsc(id, pageable);
        }
        return commentRepository.findCommentsOrderByReactionsDifferenceDesc(id, pageable);
    }

    public Comment save(@Valid Comment comment, String filmId) {
        UUID uuid = UUID.fromString(filmId);
        Film film = filmRepository.findById(uuid).orElseThrow(() -> new FilmNotFoundException(uuid));
        comment.setFilm(film);
        return commentRepository.save(comment);
    }
}
