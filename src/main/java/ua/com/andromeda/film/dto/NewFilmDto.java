package ua.com.andromeda.film.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import ua.com.andromeda.session.dto.SessionNewFilmDto;

import java.util.List;

@Getter
@Setter
@ToString
public class NewFilmDto {
    private GeneralInfoFilmDto generalInfo;
    private CrewDto crew;
    private AdditionalInfoDto additionalInfo;
    private List<SessionNewFilmDto> sessions;
}
