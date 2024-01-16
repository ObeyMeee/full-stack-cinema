package ua.com.andromeda.film;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import ua.com.andromeda.film.dto.FilmManagingDto;

import java.util.List;
import java.util.UUID;

@Repository
@RepositoryRestResource
public interface FilmRepository extends CrudRepository<Film, UUID> {
    List<Film> findAllByEnabled(boolean enabled);

    @Query("""
            select new ua.com.andromeda.film.dto.FilmManagingDto(
                f.id,
                f.title,
                f.enabled,
                f.media.poster,
                f.startReleaseAt,
                f.endReleaseAt
            )
             from Film f
            """
    )
    List<FilmManagingDto> findAllManagingDtos();
}
