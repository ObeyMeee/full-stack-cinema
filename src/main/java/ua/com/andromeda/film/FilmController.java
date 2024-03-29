package ua.com.andromeda.film;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ua.com.andromeda.film.dto.FilmManagingDto;
import ua.com.andromeda.film.dto.FilmUpdateRequestDto;
import ua.com.andromeda.film.dto.NewFilmDto;
import ua.com.andromeda.film.dto.PosterDto;

import java.util.List;
import java.util.UUID;

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

    @GetMapping("/{id}")
    public ResponseEntity<Film> findById(@PathVariable String id) {
        Film foundedFilm = filmService.findById(id);
        return ResponseEntity.ok(foundedFilm);
    }

    @GetMapping("/manage")
    public ResponseEntity<List<FilmManagingDto>> findAllFilmsToManage() {
        List<FilmManagingDto> films = filmService.findAllManaging();
        return ResponseEntity.ok(films);
    }

    @PostMapping
    public ResponseEntity<Void> save(@Valid @RequestBody NewFilmDto newFilmDto) {
        filmService.save(newFilmDto);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Void> updateFilmEnabled(
            @PathVariable UUID id,
            @RequestBody FilmUpdateRequestDto filmUpdateRequest
    ) {
        filmService.updateById(id, filmUpdateRequest.enabled());
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        filmService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}