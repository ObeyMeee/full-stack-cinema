package ua.com.andromeda.hall;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import ua.com.andromeda.session.Session;

import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "halls")
@Getter
@Setter
@ToString
public class Hall {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private int number;
    @Enumerated(EnumType.STRING)
    private HallType type;
    @OneToMany(fetch = FetchType.EAGER, mappedBy = "hall")
    private List<Row> rows;

    @OneToOne(mappedBy = "hall")
    @JsonIgnore
    @ToString.Exclude
    private Session session;
}
