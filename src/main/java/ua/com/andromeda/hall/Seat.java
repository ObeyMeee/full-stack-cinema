package ua.com.andromeda.hall;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(name = "seats")
@Getter
@Setter
public class Seat {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private int number;
    private boolean isTaken;
    @ManyToOne
    private Row row;
}