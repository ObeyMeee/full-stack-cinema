package ua.com.andromeda.comment;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.UUID;

@RepositoryRestResource
public interface CommentRepository extends CrudRepository<Comment, UUID>, PagingAndSortingRepository<Comment, UUID> {
    @Query("""
            SELECT c
            FROM Comment c
            LEFT JOIN c.reactions r
            WHERE c.film.id = :filmId
            GROUP BY c.id
            ORDER BY SUM(CASE WHEN r.type = 'LIKE' THEN 1 ELSE -1 END) ASC
            """)
    Page<Comment> findCommentsOrderByReactionsDifferenceAsc(UUID filmId, Pageable pageable);

    @Query("""
            SELECT c
            FROM Comment c
            LEFT JOIN c.reactions r
            WHERE c.film.id = :filmId
            GROUP BY c.id
            ORDER BY SUM(CASE WHEN r.type = 'LIKE' THEN 1 ELSE -1 END) DESC
            """)
    Page<Comment> findCommentsOrderByReactionsDifferenceDesc(UUID filmId, Pageable pageable);


    Page<Comment> findAllByFilmId(UUID filmId, Pageable pageable);
}
