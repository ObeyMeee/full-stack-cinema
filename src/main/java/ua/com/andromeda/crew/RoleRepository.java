package ua.com.andromeda.crew;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends CrudRepository<CrewRoleEntity, Integer>{
    Optional<CrewRoleEntity> findByRole(Role role);
}
