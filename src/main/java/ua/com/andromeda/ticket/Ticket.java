package ua.com.andromeda.ticket;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.format.annotation.DateTimeFormat;
import ua.com.andromeda.session.Session;

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
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSZ")
    private LocalDateTime boughtAt;
    private int price;
    private int row;
    private int seat;

    @ManyToOne
    @JoinColumn(name = "film_id", nullable = false)
    private Session session;
    private String username;
}
