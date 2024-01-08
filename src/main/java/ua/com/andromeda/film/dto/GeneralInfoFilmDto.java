package ua.com.andromeda.film.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class GeneralInfoFilmDto {
    private static final int FIRST_FILM_PRODUCTION_YEAR = 1895;

    @NotBlank
    private String title;

    @NotBlank
    private String description;

    @Min(0)
    private int duration;

    @Min(FIRST_FILM_PRODUCTION_YEAR)
    private int productionYear;

    private List<String> genres;
    private List<String> countries;
}
