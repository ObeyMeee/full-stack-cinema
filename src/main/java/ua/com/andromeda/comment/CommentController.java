package ua.com.andromeda.comment;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class CommentController {
    private final CommentService commentService;

    @GetMapping("/films/{filmId}/comments")
    public ResponseEntity<Page<Comment>> findAllByFilmId(@PathVariable String filmId,
                                                         @RequestParam int page,
                                                         @RequestParam int size) {
        Page<Comment> comments = commentService.findAllByFilmId(filmId, page, size);
        return ResponseEntity.ok(comments);
    }
}
