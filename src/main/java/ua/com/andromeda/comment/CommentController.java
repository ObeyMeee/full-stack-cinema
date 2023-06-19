package ua.com.andromeda.comment;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class CommentController {
    private final CommentService commentService;

    @GetMapping("/films/{filmId}/comments")
    public ResponseEntity<List<Comment>> findAllByFilmId(@PathVariable String filmId) {
        List<Comment> comments = commentService.findAllByFilmId(filmId);
        return ResponseEntity.ok(comments);
    }
}
