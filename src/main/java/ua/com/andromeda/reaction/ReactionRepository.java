package ua.com.andromeda.reaction;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ua.com.andromeda.comment.Comment;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface ReactionRepository extends CrudRepository<Reaction, Long> {
    Optional<Reaction> findByUsernameAndComment(String username, Comment comment);
    int deleteByUsernameAndCommentId(String username, UUID commentId);
}
