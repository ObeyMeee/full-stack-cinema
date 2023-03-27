package ua.com.andromeda.session;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;
import ua.com.andromeda.session.dto.SessionBuyTicketDto;
import ua.com.andromeda.session.dto.SessionDto;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface SessionRepository extends ListCrudRepository<Session, UUID> {

    @Query("""
            SELECT new ua.com.andromeda.session.SessionProjection(s.id, s.startAt, s.film.id)
            FROM Session s
            WHERE s.enabled = :enabled
            """
    )
    List<SessionProjection> findAllByEnabledEquals(boolean enabled);

    @Query("""
            select new ua.com.andromeda.session.dto.SessionDto(s.id, s.startAt)
            from Session s
            where s.film.id = :filmId
            """
    )
    List<SessionDto> findAllByFilmId(UUID filmId);

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