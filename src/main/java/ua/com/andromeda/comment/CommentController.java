package ua.com.andromeda.comment;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

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

    @PostMapping("/films/{filmId}/comments")
    public ResponseEntity<Comment> save(@PathVariable String filmId,
                                        @RequestBody Comment comment,
                                        Principal principal) {
        comment.setUsername(principal.getName());
        return ResponseEntity.ok(commentService.save(comment, filmId));
    }
}
