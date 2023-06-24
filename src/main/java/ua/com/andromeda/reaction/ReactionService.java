package ua.com.andromeda.reaction;

import jakarta.transaction.Transactional;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ua.com.andromeda.comment.Comment;
import ua.com.andromeda.comment.CommentRepository;
import ua.com.andromeda.comment.exception.CommentNotFoundException;
import ua.com.andromeda.reaction.exception.ReactionNotFoundException;
import ua.com.andromeda.user.exception.UserNotAuthenticatedException;

import java.security.Principal;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ReactionService {
    private final ReactionRepository reactionRepository;
    private final CommentRepository commentRepository;

    public void save(@NotNull ReactionType reactionType, Principal principal, @NotNull String commentId) {
        checkPrincipal(principal);
        Comment comment = getComment(commentId);
        Reaction reaction = new Reaction(principal.getName(), reactionType, comment);
        reactionRepository.save(reaction);
    }

    private void checkPrincipal(Principal principal) {
        if (principal == null) {
            throw new UserNotAuthenticatedException();
        }
    }

    private Comment getComment(String id) {
        return commentRepository.findById(UUID.fromString(id))
                .orElseThrow(() -> new CommentNotFoundException(id));
    }

    @Transactional
    public void delete(Principal principal, @NotNull String commentId) {
        checkPrincipal(principal);
        Comment comment = getComment(commentId);
        comment.getReactions().removeIf(reaction -> reaction.getUsername().equals(principal.getName()));
        reactionRepository.deleteByUsernameAndCommentId(principal.getName(), UUID.fromString(commentId));
    }

    public void update(@NotNull ReactionType reactionType, Principal principal, @NotNull String commentId) {
        Reaction reaction = getReaction(principal, commentId);
        reaction.setType(reactionType);
        reactionRepository.save(reaction);
    }

    private Reaction getReaction(Principal principal, String commentId) {
        checkPrincipal(principal);
        Comment comment = getComment(commentId);
        String username = principal.getName();
        return reactionRepository.findByUsernameAndComment(username, comment).orElseThrow(() -> {
                    String message = "Cannot find reaction of comment with id=" + "'" + commentId + "'" + " by user " + username;
                    return new ReactionNotFoundException(message);
                }
        );
    }
}
