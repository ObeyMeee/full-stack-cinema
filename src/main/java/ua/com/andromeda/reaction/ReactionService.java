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
import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ReactionService {
    private final ReactionRepository reactionRepository;
    private final CommentRepository commentRepository;

    public Set<Reaction> save(@NotNull ReactionType reactionType,
                              Principal principal,
                              @NotNull String commentId) {
        Comment comment = validatePrincipalAndGetComment(principal, commentId);
        Reaction reaction = new Reaction(principal.getName(), reactionType, comment);
        comment.addReaction(reaction);
        reactionRepository.save(reaction);
        return comment.getReactions();
    }

    private Comment validatePrincipalAndGetComment(Principal principal, @NotNull String commentId) {
        if (principal == null) {
            throw new UserNotAuthenticatedException();
        }
        return getComment(commentId);
    }

    private Comment getComment(String id) {
        return commentRepository.findById(UUID.fromString(id))
                .orElseThrow(() -> new CommentNotFoundException(id));
    }

    @Transactional
    public Set<Reaction> delete(Principal principal, @NotNull String commentId) {
        Comment comment = validatePrincipalAndGetComment(principal, commentId);
        comment.getReactions().removeIf(reaction -> reaction.getUsername().equals(principal.getName()));
        reactionRepository.deleteByUsernameAndCommentId(principal.getName(), UUID.fromString(commentId));
        return comment.getReactions();
    }

    public Set<Reaction> update(@NotNull ReactionType reactionType, Principal principal, @NotNull String commentId) {
        Comment comment = validatePrincipalAndGetComment(principal, commentId);
        String username = principal.getName();
        Reaction reaction = findByUsernameAndComment(username, comment);
        reaction.setType(reactionType);
        reactionRepository.save(reaction);
        return reaction.getComment().getReactions();
    }

    private Reaction findByUsernameAndComment(String username, Comment comment) {
        return reactionRepository.findByUsernameAndComment(username, comment).orElseThrow(() -> {
                    String message = "Cannot find reaction of comment with id=" + "'" + comment.getId() + "'" + " by user " + username;
                    return new ReactionNotFoundException(message);
                }
        );
    }
}
