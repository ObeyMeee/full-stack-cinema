package ua.com.andromeda.hall;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "rows")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Row {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private int number;

    @Enumerated(EnumType.STRING)
    private RowType type;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "row")
    private List<Seat> seats;

    @ManyToOne
    @JsonIgnore
    @ToString.Exclude
    private Hall hall;
}
