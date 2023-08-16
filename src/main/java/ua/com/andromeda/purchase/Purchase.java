package ua.com.andromeda.purchase;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;
import ua.com.andromeda.purchase.dto.PurchaseDto;
import ua.com.andromeda.session.Session;
import ua.com.andromeda.ticket.Ticket;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Purchase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "purchase", cascade = CascadeType.PERSIST)
    private List<Ticket> tickets;

    @Column(name = "dealt_at")
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSZ")
    private LocalDateTime dealtAt;
    private String username;

    public Purchase(PurchaseDto purchaseDto, String username, Session session) {
        List<Ticket> tickets = purchaseDto.getTickets()
                .stream()
                .map(t -> {
                    Ticket ticket = new Ticket();
                    ticket.setRow(t.getRow());
                    ticket.setSeat(t.getSeat());
                    ticket.setPrice(t.getPrice());
                    ticket.setSession(session);
                    ticket.setPurchase(this);
                    return ticket;
                }).toList();
        this.dealtAt = LocalDateTime.now();
        this.tickets = tickets;
        this.username = username;
    }
}
