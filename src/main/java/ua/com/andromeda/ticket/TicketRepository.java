package ua.com.andromeda.ticket;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface TicketRepository extends ListCrudRepository<Ticket, UUID> {
    @Query("""
            select new ua.com.andromeda.ticket.TicketDto(t.row, t.seat)
            from Ticket t
            where t.session.id = :sessionId
            """
    )
    List<TicketDto> findBySessionId(UUID sessionId);

    @Query("""
                select new ua.com.andromeda.ticket.TicketProfileDto(
                    new ua.com.andromeda.ticket.TicketDto(t.id, t.row, t.seat, t.price),
                    t.boughtAt,
                    s.startAt,
                    f.title,
                    s.id
                )
                from Ticket t
                join t.session s
                join s.film f
                where t.username = :username
            """
    )
    List<TicketProfileDto> findByUsername(String username);
}