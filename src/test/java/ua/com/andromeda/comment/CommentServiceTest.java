package ua.com.andromeda.comment;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.*;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import ua.com.andromeda.film.Film;
import ua.com.andromeda.film.FilmRepository;
import ua.com.andromeda.film.exception.FilmNotFoundException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
@ExtendWith(SpringExtension.class)
class CommentServiceTest {
    @Autowired
    CommentService target;

    @MockBean
    CommentRepository commentRepository;

    @MockBean
    FilmRepository filmRepository;

    @Test
    void findAllByFilmId_nullParams_shouldThrowExceptions() {
        Class<NullPointerException> expectedType = NullPointerException.class;
        CommentSort commentSort = CommentSort.RECENT;
        Sort.Direction direction = Sort.Direction.ASC;
        String filmId = UUID.randomUUID().toString();
        assertThrows(
                expectedType,
                () -> target.findAllByFilmId(null, 0, 1, commentSort, direction)
        );
        assertThrows(
                expectedType,
                () -> target.findAllByFilmId(filmId, 0, 1, null, direction)
        );
        assertThrows(
                IllegalArgumentException.class,
                () -> target.findAllByFilmId(filmId, 0, 1, commentSort, null)
        );
    }

    @Test
    void findAllByFilmId_pageLessThanZero_shouldThrowIllegalArgumentException() {
        assertThrows(
                IllegalArgumentException.class,
                () -> target.findAllByFilmId(UUID.randomUUID().toString(), -1, 1, CommentSort.RECENT, Sort.Direction.ASC)
        );
    }

    @Test
    void findAllByFilmId_sizeLessThanOne_IllegalArgumentException() {
        assertThrows(
                IllegalArgumentException.class,
                () -> target.findAllByFilmId(UUID.randomUUID().toString(), 1, 0, CommentSort.RECENT, Sort.Direction.ASC)
        );
    }

    @Test
    void findAllByFilmId_recentSort_shouldReturnPageComment() {
        // init
        UUID filmId = UUID.randomUUID();
        int page = 0;
        int size = 5;
        Sort.Direction direction = Sort.Direction.DESC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, "wroteAt"));
        List<Comment> comments = List.of(new Comment(), new Comment());
        Page<Comment> expected = new PageImpl<>(comments);

        // config
        when(commentRepository.findAllByFilmId(filmId, pageable)).thenReturn(expected);

        // method invocation
        Page<Comment> actual = target.findAllByFilmId(filmId.toString(), page, size, CommentSort.RECENT, direction);

        // test
        verify(commentRepository, times(1)).findAllByFilmId(filmId, pageable);
        verify(commentRepository, never()).findCommentsOrderByReactionsDifferenceAsc(any(UUID.class), any(Pageable.class));
        verify(commentRepository, never()).findCommentsOrderByReactionsDifferenceDesc(any(UUID.class), any(Pageable.class));
        assertEquals(expected, actual);
        assertEquals(comments.size(), actual.getContent().size());
    }

    @Test
    void findAllByFilmId_sortUsefulDirectionAsc_shouldReturnPageComment() {
        // init
        UUID filmId = UUID.randomUUID();
        int page = 0;
        int size = 5;
        Sort.Direction direction = Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(page, size);
        List<Comment> comments = List.of(new Comment(), new Comment());
        Page<Comment> expected = new PageImpl<>(comments);

        // config
        when(commentRepository.findCommentsOrderByReactionsDifferenceAsc(filmId, pageable)).thenReturn(expected);

        // method invocation
        Page<Comment> actual = target.findAllByFilmId(filmId.toString(), page, size, CommentSort.USEFUL, direction);

        // test
        verify(commentRepository, times(1)).findCommentsOrderByReactionsDifferenceAsc(filmId, pageable);
        verify(commentRepository, never()).findAllByFilmId(any(UUID.class), any(Pageable.class));
        verify(commentRepository, never()).findCommentsOrderByReactionsDifferenceDesc(any(UUID.class), any(Pageable.class));
        assertEquals(expected, actual);
        assertEquals(comments.size(), actual.getContent().size());
    }

    @Test
    void findAllByFilmId_sortUsefulDirectionDesc_shouldReturnPageComment() {
        // init
        UUID filmId = UUID.randomUUID();
        int page = 0;
        int size = 5;
        Sort.Direction direction = Sort.Direction.DESC;
        Pageable pageable = PageRequest.of(page, size);
        List<Comment> comments = List.of(new Comment(), new Comment());
        Page<Comment> expected = new PageImpl<>(comments);

        // config
        when(commentRepository.findCommentsOrderByReactionsDifferenceDesc(filmId, pageable)).thenReturn(expected);

        // method invocation
        Page<Comment> actual = target.findAllByFilmId(filmId.toString(), page, size, CommentSort.USEFUL, direction);

        // test
        verify(commentRepository, times(1)).findCommentsOrderByReactionsDifferenceDesc(filmId, pageable);
        verify(commentRepository, never()).findAllByFilmId(any(UUID.class), any(Pageable.class));
        verify(commentRepository, never()).findCommentsOrderByReactionsDifferenceAsc(any(UUID.class), any(Pageable.class));
        assertEquals(expected, actual);
        assertEquals(comments.size(), actual.getContent().size());
    }


    @Test
    void save_comment_shouldHaveIdAndFilm() {
        // init
        Comment comment = getComment();
        UUID filmId = UUID.randomUUID();
        Film film = new Film();
        film.setId(filmId);

        // config
        when(filmRepository.findById(filmId)).thenReturn(Optional.of(film));
        when(commentRepository.save(any(Comment.class))).thenReturn(comment);
        when(commentRepository.save(any(Comment.class))).thenAnswer(invocation -> {
            Comment savedComment = invocation.getArgument(0);
            savedComment.setId(UUID.randomUUID());
            return savedComment;
        });

        // method invocation
        Comment saved = target.save(comment, filmId.toString());

        // test
        verify(commentRepository, times(1)).save(comment);
        verify(filmRepository, times(1)).findById(filmId);
        assertNotNull(saved.getFilm());
        assertNotNull(saved.getId());
    }

    @Test
    void save_invalidFilmId_shouldThrowExceptions() {
        assertThrows(IllegalArgumentException.class, (() -> target.save(new Comment(), "")));
        assertThrows(NullPointerException.class, (() -> target.save(new Comment(), null)));
    }

    @Test
    void save_nullComment_shouldThrowNullPointerException() {
        when(filmRepository.findById(any())).thenReturn(Optional.of(new Film()));
        assertThrows(NullPointerException.class, (() -> target.save(null, UUID.randomUUID().toString())));
    }

    @Test
    void save_nonExistingFilmId_shouldThrowFilmNotFoundException() {
        UUID filmId = UUID.randomUUID();
        when(filmRepository.findById(filmId)).thenReturn(Optional.empty());
        assertThrows(FilmNotFoundException.class, (() -> target.save(new Comment(), filmId.toString())));
    }

    private Comment getComment() {
        Comment comment = new Comment();
        comment.setMark(5.0);
        comment.setReview("review");
        comment.setUsername("Andrii");
        comment.setWroteAt(LocalDateTime.now());
        return comment;
    }
}