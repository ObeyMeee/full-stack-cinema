package ua.com.andromeda.reaction;

import jakarta.transaction.Transactional;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
    private static final Logger LOGGER = LoggerFactory.getLogger(ReactionService.class);
    private final ReactionRepository reactionRepository;
    private final CommentRepository commentRepository;

    public Set<Reaction> save(@NotNull ReactionType reactionType,
                              Principal principal,
                              @NotNull String commentId) {
        Comment comment = validatePrincipalAndGetComment(principal, commentId);
        String username = principal.getName();
        Reaction reaction = new Reaction(username, reactionType, comment);
        comment.addReaction(reaction);
        reactionRepository.save(reaction);
        LOGGER.info("User {} left reaction {} of comment {}", username, reactionType, comment);
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
        String username = principal.getName();
        comment.getReactions().removeIf(reaction -> reaction.getUsername().equals(username));
        reactionRepository.deleteByUsernameAndCommentId(username, UUID.fromString(commentId));
        LOGGER.info("User {} deleted reaction of comment {}", username, comment);
        return comment.getReactions();
    }

    public Set<Reaction> update(@NotNull ReactionType reactionType, Principal principal, @NotNull String commentId) {
        Comment comment = validatePrincipalAndGetComment(principal, commentId);
        String username = principal.getName();
        Reaction reaction = findByUsernameAndComment(username, comment);
        reaction.setType(reactionType);
        reactionRepository.save(reaction);
        LOGGER.info("User {} updated reaction {} of comment {}", username, reactionType, comment);
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
