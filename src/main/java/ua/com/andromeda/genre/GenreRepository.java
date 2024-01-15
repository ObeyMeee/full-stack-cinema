package ua.com.andromeda.genre;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface GenreRepository extends CrudRepository<Genre, UUID> {
    Optional<Genre> findByName(String name);
}
