package ua.com.andromeda.session;

import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface SessionRepository extends ListCrudRepository<Session, UUID> {
    List<SessionIdAndStartAtProjection> findByFilm_Id(UUID filmId);
}