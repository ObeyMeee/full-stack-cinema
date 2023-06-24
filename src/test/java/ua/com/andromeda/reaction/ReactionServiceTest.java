package ua.com.andromeda.reaction;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import ua.com.andromeda.comment.Comment;
import ua.com.andromeda.comment.CommentRepository;
import ua.com.andromeda.comment.exception.CommentNotFoundException;
import ua.com.andromeda.reaction.exception.ReactionNotFoundException;
import ua.com.andromeda.user.exception.UserNotAuthenticatedException;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@SpringBootTest
@ExtendWith(SpringExtension.class)
class ReactionServiceTest {
    @MockBean
    ReactionRepository reactionRepository;

    @MockBean
    CommentRepository commentRepository;

    @MockBean
    Principal principal;

    @Autowired
    ReactionService target;

    private final String defaultName = "Andrii";
    private final String commentId = UUID.randomUUID().toString();
    private final ReactionType reactionType = ReactionType.LIKE;

    @Test
    void save_userNotAuthenticated_shouldThrowException() {
        assertThrows(UserNotAuthenticatedException.class, () -> target.save(ReactionType.LIKE, null, commentId));
    }

    @Test
    void save_invalidCommentId_shouldThrowException() {
        assertThrows(NullPointerException.class, () -> target.save(ReactionType.LIKE, principal, null));
        assertThrows(IllegalArgumentException.class, () -> target.save(ReactionType.LIKE, principal, "invalid uuid"));
    }

    @Test
    void save_nonExistingCommentId_shouldThrowException() {
        when(commentRepository.findById(UUID.fromString(commentId))).thenReturn(Optional.empty());
        assertThrows(CommentNotFoundException.class, () -> target.save(ReactionType.LIKE, principal, commentId));
    }

    @Test
    void save_success() {
        UUID uuid = UUID.fromString(commentId);
        Comment comment = new Comment();
        when(commentRepository.findById(uuid)).thenReturn(Optional.of(comment));
        when(principal.getName()).thenReturn(defaultName);

        target.save(reactionType, principal, commentId);

        verify(commentRepository, times(1)).findById(uuid);
        verify(reactionRepository, times(1)).save(any());
        verify(reactionRepository).save(new Reaction(defaultName, reactionType, comment));
    }

    @Test
    void delete_userNotAuthenticated_shouldThrowException() {
        assertThrows(UserNotAuthenticatedException.class, () -> target.delete(null, commentId));
    }

    @Test
    void delete_invalidCommentId_shouldThrowIllegalArgumentException() {
        when(principal.getName()).thenReturn(defaultName);
        assertThrows(IllegalArgumentException.class, () -> target.delete(principal, "invalid uuid"));
    }

    @Test
    void delete_nonExistingCommentId_shouldThrowException() {
        when(principal.getName()).thenReturn(defaultName);
        when(commentRepository.findById(UUID.fromString(commentId))).thenReturn(Optional.empty());
        assertThrows(CommentNotFoundException.class, () -> target.delete(principal, commentId));
    }

    @Test
    void delete_success() {
        UUID uuid = UUID.fromString(commentId);
        Comment comment = new Comment();
        Reaction firstReaction = new Reaction(defaultName, reactionType, comment);
        Reaction secondReaction = new Reaction("", reactionType, comment);
        List<Reaction> reactions = new ArrayList<>();
        reactions.add(firstReaction);
        reactions.add(secondReaction);
        comment.setReactions(reactions);

        when(principal.getName()).thenReturn(defaultName);
        when(commentRepository.findById(uuid)).thenReturn(Optional.of(comment));

        target.delete(principal, commentId);

        verify(reactionRepository, times(1)).deleteByUsernameAndCommentId(defaultName, uuid);
        List<Reaction> resultedReactions = comment.getReactions();
        assertEquals(1, resultedReactions.size());
        assertEquals(secondReaction, resultedReactions.get(0));
    }

    @Test
    void update_userNotAuthenticated_shouldThrowException() {
        assertThrows(UserNotAuthenticatedException.class, () -> target.update(reactionType, null, commentId));
    }

    @Test
    void update_invalidCommentId_shouldThrowIllegalArgumentException() {
        when(principal.getName()).thenReturn(defaultName);
        assertThrows(IllegalArgumentException.class, () -> target.update(reactionType, principal, "invalid uuid"));
    }

    @Test
    void update_commentIdNotFound() {
        when(principal.getName()).thenReturn(defaultName);
        when(commentRepository.findById(UUID.fromString(commentId))).thenReturn(Optional.empty());

        assertThrows(CommentNotFoundException.class, () -> target.update(reactionType, principal, commentId));
    }

    @Test
    void update_nonExistingReactionByUsernameAndComment_shouldThrowReactionNotFoundException() {
        Comment comment = new Comment();
        when(principal.getName()).thenReturn(defaultName);
        when(commentRepository.findById(UUID.fromString(commentId))).thenReturn(Optional.of(comment));
        when(reactionRepository.findByUsernameAndComment(defaultName, comment)).thenReturn(Optional.empty());

        assertThrows(ReactionNotFoundException.class, () -> target.update(reactionType, principal, commentId));
        verify(reactionRepository, times(1)).findByUsernameAndComment(defaultName, comment);
    }

    @Test
    void update_success() {
        Comment comment = new Comment();
        Reaction foundedReaction = new Reaction(defaultName, reactionType, comment);
        when(principal.getName()).thenReturn(defaultName);
        when(commentRepository.findById(UUID.fromString(commentId))).thenReturn(Optional.of(comment));
        when(reactionRepository.findByUsernameAndComment(defaultName, comment)).thenReturn(Optional.of(foundedReaction));

        target.update(reactionType, principal, commentId);

        verify(reactionRepository, times(1)).findByUsernameAndComment(defaultName, comment);
        verify(reactionRepository, times(1)).save(foundedReaction);
        assertEquals(reactionType, foundedReaction.getType());
    }
}