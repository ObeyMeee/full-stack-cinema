package ua.com.andromeda.hall;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface HallRepository extends CrudRepository<Hall, UUID> {
    Optional<Hall> findByNumber(int number);
}
