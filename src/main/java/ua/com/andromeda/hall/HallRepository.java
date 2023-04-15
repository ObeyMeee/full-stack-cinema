package ua.com.andromeda.hall;

import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface HallRepository extends CrudRepository<Hall, UUID> {
}