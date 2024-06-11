package ua.com.andromeda.purchase;

import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import java.util.stream.Stream;

@Repository
public interface PurchaseRepository extends ListCrudRepository<Purchase, Long> {
    Stream<Purchase> findAllByUsernameOrderByDealtAtDesc(String username);
}
