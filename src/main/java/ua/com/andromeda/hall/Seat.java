package ua.com.andromeda.hall;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

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
    @JsonIgnore
    @ToString.Exclude
    private Row row;
}