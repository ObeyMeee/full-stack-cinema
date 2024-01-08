package ua.com.andromeda.crew;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import ua.com.andromeda.film.Film;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "crew_members")
@Getter
@Setter
@ToString
public class CrewMember {
    @Id
    private Long id;

    @Column(name = "full_name")
    private String fullName;

    @ElementCollection(
            targetClass = Role.class,
            fetch = FetchType.EAGER
    )
    @CollectionTable(
            name = "crew_roles",
            joinColumns = @JoinColumn(name = "crew_member")
    )
    @JsonIgnore
    @ToString.Exclude
    private Set<Role> roles = new HashSet<>();

    @ManyToMany(mappedBy = "crew")
    @JsonIgnore
    @ToString.Exclude
    private List<Film> films;
}
