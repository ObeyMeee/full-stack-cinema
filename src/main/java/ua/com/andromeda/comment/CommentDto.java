package ua.com.andromeda.comment;

import lombok.Builder;
import lombok.Getter;
import ua.com.andromeda.reaction.ReactionType;

import java.util.UUID;

@Builder
@Getter
public class CommentDto {
    private UUID id;
    private double mark;
    private String review;
    private String username;
    private long reactionRating;
    private ReactionType currentUserReactionType;
}
