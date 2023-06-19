package ua.com.andromeda.comment;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import ua.com.andromeda.film.Film;
import ua.com.andromeda.film.FilmNotFoundException;
import ua.com.andromeda.film.FilmRepository;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final FilmRepository filmRepository;

    public Page<Comment> findAllByFilmId(String filmId, int page, int size) {
        UUID id = UUID.fromString(filmId);
        Pageable pageable = PageRequest.of(page, size);
        return commentRepository.findAllByFilmId(id, pageable);
    }

    public Comment save(@Valid Comment comment, String filmId) {
        UUID id = UUID.fromString(filmId);
        Film film = filmRepository.findById(id).orElseThrow(() -> new FilmNotFoundException(id));
        comment.setFilm(film);
        return commentRepository.save(comment);
    }
}
