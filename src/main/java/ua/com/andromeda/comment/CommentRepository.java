package ua.com.andromeda.comment;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.UUID;

@RepositoryRestResource
public interface CommentRepository extends CrudRepository<Comment, UUID>, PagingAndSortingRepository<Comment, UUID> {
    Page<Comment> findAllByFilmId(UUID filmId, Pageable pageable);
}
