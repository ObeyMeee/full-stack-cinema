package ua.com.andromeda.ticket;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import ua.com.andromeda.session.Session;
import ua.com.andromeda.user.User;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "tickets")
@Getter
@Setter
@ToString
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "bought_at")
    private LocalDateTime boughtAt;

    private int price;
    private int row;
    private int seat;

    @Enumerated(EnumType.STRING)
    private TicketType type;

    @ManyToOne
    @JoinColumn(name = "film_id", nullable = false)
    private Session session;
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
