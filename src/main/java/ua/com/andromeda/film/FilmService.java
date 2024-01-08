package ua.com.andromeda.film;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ua.com.andromeda.film.dto.NewFilmDto;
import ua.com.andromeda.film.dto.PosterDto;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FilmService {
    private final FilmRepository filmRepository;
    private final FilmMapper filmMapper;

    public List<PosterDto> getPoster() {
        List<Film> enabledFilms = filmRepository.findAllByEnabled(true);
        return enabledFilms.stream()
                .map(filmMapper::toPosterDto)
                .toList();
    }

    public void save(@Valid NewFilmDto newFilmDto) {
        Film film = filmMapper.toFilm(newFilmDto);
        filmRepository.save(film);
    }
}
