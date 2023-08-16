package ua.com.andromeda.purchase;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.stream.Stream;

@Repository
public interface PurchaseRepository extends CrudRepository<Purchase, Long> {
    Stream<Purchase> findAllByUsernameOrderByDealtAtDesc(String username);
}
