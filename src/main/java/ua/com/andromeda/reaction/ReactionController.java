package ua.com.andromeda.reaction;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequiredArgsConstructor
public class ReactionController {
    private final ReactionService reactionService;

    @PostMapping("/films/{filmId}/comments/{commentId}/reactions")
    public ResponseEntity<Void> save(@PathVariable String commentId,
                                     @RequestBody Reaction reaction,
                                     Principal principal) {
        reactionService.save(reaction.getType(), principal, commentId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/films/{filmId}/comments/{commentId}/reactions")
    public ResponseEntity<Void> delete(@PathVariable String commentId,
                                     Principal principal) {
        reactionService.delete(principal, commentId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/films/{filmId}/comments/{commentId}/reactions")
    public ResponseEntity<Void> update(@PathVariable String commentId,
                                     @RequestBody Reaction reaction,
                                     Principal principal) {
        reactionService.update(reaction.getType(), principal, commentId);
        return ResponseEntity.noContent().build();
    }


}
