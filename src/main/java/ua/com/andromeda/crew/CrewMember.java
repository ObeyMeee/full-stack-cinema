package ua.com.andromeda.crew;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import ua.com.andromeda.film.Film;

import java.util.HashSet;
import java.util.List;
import java.util.Objects;
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


    @ManyToMany(
            fetch = FetchType.EAGER,
            cascade = {CascadeType.MERGE}
    )
    @JoinTable(
            name = "crew_roles",
            joinColumns = @JoinColumn(name = "crew_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<CrewRoleEntity> roles = new HashSet<>();

    @ManyToMany(mappedBy = "crew")
    @JsonIgnore
    @ToString.Exclude
    private List<Film> films;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CrewMember that = (CrewMember) o;
        return Objects.equals(id, that.id) && Objects.equals(fullName, that.fullName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, fullName);
    }
}
