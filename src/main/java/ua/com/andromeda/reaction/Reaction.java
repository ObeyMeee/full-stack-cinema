package ua.com.andromeda.reaction;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import ua.com.andromeda.comment.Comment;

@Entity
@Table(name = "reactions")
@Data
@NoArgsConstructor
public class Reaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;

    @Enumerated(EnumType.STRING)
    private ReactionType type;

    @ManyToOne
    @JoinColumn(name = "comment_id")
    @ToString.Exclude
    @JsonIgnore
    private Comment comment;

    public Reaction(String username, ReactionType type, Comment comment) {
        this.username = username;
        this.type = type;
        this.comment = comment;
    }
}
