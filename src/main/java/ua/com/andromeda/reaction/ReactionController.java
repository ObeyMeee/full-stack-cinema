package ua.com.andromeda.reaction;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class ReactionController {
    private final ReactionService reactionService;

    @PostMapping("/films/{filmId}/comments/{commentId}/reactions")
    public ResponseEntity<List<Reaction>> save(@PathVariable String commentId,
                                               @RequestBody Reaction reaction,
                                               Principal principal) {
        List<Reaction> reactions = reactionService.save(reaction.getType(), principal, commentId);
        return ResponseEntity.ok(reactions);
    }

    @DeleteMapping("/films/{filmId}/comments/{commentId}/reactions")
    public ResponseEntity<List<Reaction>> delete(@PathVariable String commentId,
                                                 Principal principal) {
        List<Reaction> reactions = reactionService.delete(principal, commentId);
        return ResponseEntity.ok(reactions);
    }

    @PutMapping("/films/{filmId}/comments/{commentId}/reactions")
    public ResponseEntity<List<Reaction>> update(@PathVariable String commentId,
                                                 @RequestBody Reaction reaction,
                                                 Principal principal) {
        List<Reaction> reactions = reactionService.update(reaction.getType(), principal, commentId);
        return ResponseEntity.ok(reactions);
    }
}
