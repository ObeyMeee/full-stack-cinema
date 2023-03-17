package ua.com.andromeda.ticket;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import ua.com.andromeda.film.Film;
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
    private Film film;
    @ManyToOne
    private User user;
}
