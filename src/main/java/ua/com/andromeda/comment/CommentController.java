package ua.com.andromeda.comment;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDateTime;

@RestController
@RequiredArgsConstructor
@RequestMapping("/films/{filmId}/comments")
public class CommentController {
    private final CommentService commentService;

    @GetMapping
    public ResponseEntity<Page<Comment>> findAllByFilmId(@PathVariable String filmId,
                                                         @RequestParam int page,
                                                         @RequestParam int size,
                                                         @RequestParam CommentSort sort,
                                                         @RequestParam Sort.Direction direction) {
        Page<Comment> comments = commentService.findAllByFilmId(filmId, page, size, sort, direction);
        return ResponseEntity.ok(comments);
    }

    @PostMapping
    public ResponseEntity<Comment> save(@PathVariable String filmId,
                                        @RequestBody Comment comment,
                                        Principal principal) {
        comment.setUsername(principal.getName());
        comment.setWroteAt(LocalDateTime.now());
        return ResponseEntity.ok(commentService.save(comment, filmId));
    }
}
