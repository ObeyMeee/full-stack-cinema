package ua.com.andromeda.ticket;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import ua.com.andromeda.purchase.Purchase;
import ua.com.andromeda.session.Session;

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

    private int price;
    private int row;
    private int seat;

    @ManyToOne
    @JoinColumn(name = "session_id", nullable = false)
    private Session session;

    @ManyToOne
    @JoinColumn(name = "purchase_id")
    private Purchase purchase;
}
