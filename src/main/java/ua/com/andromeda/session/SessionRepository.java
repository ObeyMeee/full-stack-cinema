package ua.com.andromeda.session;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.data.util.Streamable;
import org.springframework.stereotype.Repository;
import ua.com.andromeda.session.dto.SessionBuyTicketDto;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface SessionRepository extends ListCrudRepository<Session, UUID> {

    Streamable<Session> findAllByEnabledEquals(boolean enabled);

    Streamable<Session> findAllByFilmId(UUID filmId);

    @Query("""
            select new ua.com.andromeda.session.dto.SessionBuyTicketDto(
                    s.film.title,
                    s.startAt,
                    s.film.media.image,
                    s.hall
            )
            from Session s
            where s.id = :id
            """
    )
    Optional<SessionBuyTicketDto> findSessionBuyTicketDtoById(UUID id);
}