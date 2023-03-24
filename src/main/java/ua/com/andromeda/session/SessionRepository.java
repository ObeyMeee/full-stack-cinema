package ua.com.andromeda.session;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
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
            SELECT new ua.com.andromeda.session.SessionDto(s.id, s.startAt)
            FROM Session s
            WHERE s.film.id = :filmId
            """
    )
    List<SessionDto> findAllByFilmId(UUID filmId);
}