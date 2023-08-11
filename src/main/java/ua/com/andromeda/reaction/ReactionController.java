package ua.com.andromeda.reaction;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Set;

@RestController
@RequiredArgsConstructor
public class ReactionController {
    private final ReactionService reactionService;

    @PostMapping("/films/{filmId}/comments/{commentId}/reactions")
    public ResponseEntity<Set<Reaction>> save(@PathVariable String commentId,
                                               @RequestBody Reaction reaction,
                                               Principal principal) {
        Set<Reaction> reactions = reactionService.save(reaction.getType(), principal, commentId);
        return ResponseEntity.ok(reactions);
    }

    @DeleteMapping("/films/{filmId}/comments/{commentId}/reactions")
    public ResponseEntity<Set<Reaction>> delete(@PathVariable String commentId,
                                                 Principal principal) {
        Set<Reaction> reactions = reactionService.delete(principal, commentId);
        return ResponseEntity.ok(reactions);
    }

    @PutMapping("/films/{filmId}/comments/{commentId}/reactions")
    public ResponseEntity<Set<Reaction>> update(@PathVariable String commentId,
                                                 @RequestBody Reaction reaction,
                                                 Principal principal) {
        Set<Reaction> reactions = reactionService.update(reaction.getType(), principal, commentId);
        return ResponseEntity.ok(reactions);
    }
}
