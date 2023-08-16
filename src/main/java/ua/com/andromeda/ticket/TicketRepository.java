package ua.com.andromeda.ticket;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;
import ua.com.andromeda.ticket.dto.TicketDto;

import java.util.List;
import java.util.UUID;

@Repository
public interface TicketRepository extends ListCrudRepository<Ticket, UUID> {
    @Query("""
            select new ua.com.andromeda.ticket.dto.TicketDto(t.row, t.seat)
            from Ticket t
            where t.session.id = :sessionId
            """
    )
    List<TicketDto> findBySessionId(UUID sessionId);
}