package ua.com.andromeda.comment;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;
import java.util.UUID;

@RepositoryRestResource
public interface CommentRepository extends CrudRepository<Comment, UUID> {
    List<Comment> findAllByFilmId(UUID filmId);
}
