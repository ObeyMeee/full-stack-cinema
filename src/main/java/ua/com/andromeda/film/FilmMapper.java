package ua.com.andromeda.film;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;
import ua.com.andromeda.country.Country;
import ua.com.andromeda.crew.CrewMember;
import ua.com.andromeda.crew.CrewRoleEntity;
import ua.com.andromeda.crew.Role;
import ua.com.andromeda.crew.RoleRepository;
import ua.com.andromeda.film.dto.*;
import ua.com.andromeda.genre.Genre;
import ua.com.andromeda.genre.GenreRepository;
import ua.com.andromeda.session.Session;
import ua.com.andromeda.session.SessionMapper;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Component
@AllArgsConstructor
public class FilmMapper {

    private final SessionMapper sessionMapper;
    private final RoleRepository roleRepository;
    private final GenreRepository genreRepository;

    public PosterDto toPosterDto(Film film) {
        return new PosterDto(film.getId(), film.getTitle(), film.getMedia());
    }

    public Film toFilm(NewFilmDto newFilmDto) {
        GeneralInfoFilmDto generalInfo = newFilmDto.getGeneralInfo();
        CrewDto crewDto = newFilmDto.getCrew();
        Set<CrewMember> crewMembers = getCrewMembers(crewDto);
        List<Session> sessions = getSessions(newFilmDto);
        Set<Genre> genres = mapGenres(generalInfo);
        Set<Country> countries = mapCountries(generalInfo);
        AdditionalInfoDto additionalInfo = newFilmDto.getAdditionalInfo();

        return Film.builder()
                .title(generalInfo.getTitle())
                .description(generalInfo.getDescription())
                .duration(generalInfo.getDuration())
                .productionYear(generalInfo.getProductionYear())
                .countries(countries)
                .genres(genres)
                .crew(crewMembers)
                .ageRestriction(additionalInfo.getAgeRestriction())
                .language(additionalInfo.getLanguage())
                .startReleaseAt(additionalInfo.getStartReleaseAt())
                .endReleaseAt(additionalInfo.getEndReleaseAt())
                .media(additionalInfo.getMedia())
                .sessions(sessions)
                .build();
    }

    private Set<Country> mapCountries(GeneralInfoFilmDto generalInfo) {
        return generalInfo
                .getCountries()
                .stream()
                .map(Country::new)
                .collect(Collectors.toSet());
    }

    private Set<CrewMember> getCrewMembers(CrewDto crewDto) {
        Collection<CrewMember> crew = Stream.of(
                        getCrewMemberStream(crewDto.getActors(), Role.ACTOR),
                        getCrewMemberStream(crewDto.getDirectors(), Role.DIRECTOR),
                        getCrewMemberStream(crewDto.getScreenwriters(), Role.SCREENWRITER)
                )
                .flatMap(stream -> stream)
                .collect(
                        Collectors.toMap(
                                CrewMember::getId,
                                crewMember -> crewMember,
                                this::mergeRoles
                        )
                )
                .values();
        return new HashSet<>(crew);
    }


    private Stream<CrewMember> getCrewMemberStream(List<CrewMemberDto> crewMembers, Role role) {
        Set<CrewRoleEntity> roles = getCrewRoleEntities(role);
        return crewMembers.stream()
                .map(crewMemberDto -> {
                    CrewMember crewMember = new CrewMember();
                    crewMember.setId(crewMemberDto.getId());
                    crewMember.setFullName(crewMemberDto.getFullName());
                    crewMember.setRoles(roles);
                    return crewMember;
                });
    }

    private Set<CrewRoleEntity> getCrewRoleEntities(Role role) {
        Optional<CrewRoleEntity> optionalRole = roleRepository.findByRole(role);
        return optionalRole
                .map(Set::of)
                .orElse(Collections.emptySet());
    }

    private CrewMember mergeRoles(CrewMember existing, CrewMember other) {
        existing.getRoles().addAll(other.getRoles());
        return existing;
    }

    private Set<Genre> mapGenres(GeneralInfoFilmDto generalInfo) {
        return generalInfo
                .getGenres()
                .stream()
                .map(genreName -> {
                    Optional<Genre> optionalGenre = genreRepository.findByName(genreName);
                    return optionalGenre.orElseGet(() -> new Genre(genreName));
                })
                .collect(Collectors.toSet());
    }

    private List<Session> getSessions(NewFilmDto newFilmDto) {
        return newFilmDto
                .getSessions()
                .stream()
                .map(sessionMapper::toModel)
                .toList();
    }
}
