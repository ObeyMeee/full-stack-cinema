package ua.com.andromeda.film;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ua.com.andromeda.film.dto.NewFilmDto;
import ua.com.andromeda.film.dto.PosterDto;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/films")
public class FilmController {
    private final FilmService filmService;

    @GetMapping
    public ResponseEntity<List<PosterDto>> findAll() {
        List<PosterDto> posters = filmService.getPoster();
        return ResponseEntity.ok(posters);
    }

    @PostMapping
    public ResponseEntity<Void> save(@Valid @RequestBody NewFilmDto newFilmDto) {
        filmService.save(newFilmDto);
        return ResponseEntity.ok().build();
    }
}