package ua.com.andromeda.film;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.com.andromeda.film.dto.PosterDto;

import java.util.List;

@RestController
public class FilmController {

    private final FilmService filmService;

    public FilmController(FilmService filmService) {
        this.filmService = filmService;
    }

    @GetMapping("/poster")
    public ResponseEntity<List<PosterDto>> getPoster() {
        List<PosterDto> posters = filmService.getPoster();
        return new ResponseEntity<>(posters, HttpStatus.OK);
    }
}
