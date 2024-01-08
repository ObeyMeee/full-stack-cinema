package ua.com.andromeda.film;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;
import ua.com.andromeda.country.Country;
import ua.com.andromeda.crew.CrewMember;
import ua.com.andromeda.crew.Role;
import ua.com.andromeda.film.dto.*;
import ua.com.andromeda.genre.Genre;
import ua.com.andromeda.session.Session;
import ua.com.andromeda.session.SessionMapper;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Component
@AllArgsConstructor
public class FilmMapper {

    private final SessionMapper sessionMapper;

    public PosterDto toPosterDto(Film film) {
        return new PosterDto(film.getId(), film.getTitle(), film.getMedia());
    }

    public Film toFilm(NewFilmDto newFilmDto) {
        GeneralInfoFilmDto generalInfo = newFilmDto.getGeneralInfo();
        CrewDto crewDto = newFilmDto.getCrew();
        Set<CrewMember> crewMembers = getCrewMembers(crewDto);
        List<Session> sessions = getSessions(newFilmDto);
        List<Genre> genres = mapGenres(generalInfo);
        List<Country> countries = mapCountries(generalInfo);
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

    private List<Country> mapCountries(GeneralInfoFilmDto generalInfo) {
        return generalInfo
                .getCountries()
                .stream()
                .map(Country::new)
                .toList();
    }

    private Set<CrewMember> getCrewMembers(CrewDto crewDto) {
        return (Set<CrewMember>) Stream.of(
                        getCrewMemberStream(crewDto.getActors(), Role.ACTOR),
                        getCrewMemberStream(crewDto.getDirectors(), Role.DIRECTOR),
                        getCrewMemberStream(crewDto.getScreenwriters(), Role.SCREENWRITER)
                )
                .flatMap(stream -> stream)
                .collect(Collectors.toMap(
                        CrewMember::getId,
                        crewMember -> crewMember,
                        this::mergeRoles
                ))
                .values();
    }


    private Stream<CrewMember> getCrewMemberStream(List<CrewMemberDto> crewMembers, Role role) {
        return crewMembers.stream()
                .map(crewMemberDto -> {
                    CrewMember crewMember = new CrewMember();
                    crewMember.setId(crewMemberDto.getId());
                    crewMember.setFullName(crewMemberDto.getFullName());
                    crewMember.setRoles(Set.of(role));
                    return crewMember;
                });
    }

    private CrewMember mergeRoles(CrewMember existing, CrewMember other) {
        existing.getRoles().addAll(other.getRoles());
        return existing;
    }

    private List<Genre> mapGenres(GeneralInfoFilmDto generalInfo) {
        return generalInfo
                .getGenres()
                .stream()
                .map(Genre::new)
                .toList();
    }

    private List<Session> getSessions(NewFilmDto newFilmDto) {
        return newFilmDto
                .getSessions()
                .stream()
                .map(sessionMapper::toModel)
                .toList();
    }
}
