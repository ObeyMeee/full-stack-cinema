package ua.com.andromeda.film;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
@RepositoryRestResource
public interface FilmRepository extends CrudRepository<Film, UUID> {
    List<Film> findAllByEnabled(boolean enabled);
}
