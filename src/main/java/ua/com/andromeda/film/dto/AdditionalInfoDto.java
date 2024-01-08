package ua.com.andromeda.film.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.format.annotation.DateTimeFormat;
import ua.com.andromeda.media.Media;

import java.time.LocalDate;

@Getter
@Setter
@ToString
public class AdditionalInfoDto {
    @NotBlank
    private String language;

    @Min(0)
    private int ageRestriction;

    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSZ")
    private LocalDate startReleaseAt;

    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSZ")
    private LocalDate endReleaseAt;

    private Media media;
}
