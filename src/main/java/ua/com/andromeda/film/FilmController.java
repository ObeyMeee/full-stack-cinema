package ua.com.andromeda.film;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.com.andromeda.film.dto.PosterDto;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class FilmController {
    private final FilmService filmService;

    @GetMapping("/films")
    public ResponseEntity<List<PosterDto>> findAll() {
        List<PosterDto> posters = filmService.getPoster();
        return new ResponseEntity<>(posters, HttpStatus.OK);
    }
}