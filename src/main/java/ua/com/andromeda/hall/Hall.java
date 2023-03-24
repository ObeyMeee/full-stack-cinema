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
    @OneToMany(mappedBy = "hall")
    @ToString.Exclude
    @JsonIgnore
    private List<Row> rows;

    @OneToOne(mappedBy = "hall")
    @JsonIgnore
    private Session session;
}
