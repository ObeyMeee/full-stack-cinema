package ua.com.andromeda.film.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FilmManagingDto {
    private UUID id;
    private String title;
    private boolean enabled;
    private String posterUrl;
    private LocalDate startReleaseAt;
    private LocalDate endReleaseAt;
}
