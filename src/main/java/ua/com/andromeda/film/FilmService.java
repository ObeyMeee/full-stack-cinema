package ua.com.andromeda.film;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ua.com.andromeda.film.dto.FilmManagingDto;
import ua.com.andromeda.film.dto.NewFilmDto;
import ua.com.andromeda.film.dto.PosterDto;
import ua.com.andromeda.film.exception.FilmNotFoundException;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FilmService {
    private final FilmRepository filmRepository;
    private final FilmMapper filmMapper;

    public Film findById(String id) {
        UUID uuid = UUID.fromString(id);
        return filmRepository
                .findById(uuid)
                .orElseThrow(() -> new FilmNotFoundException(uuid));
    }

    public List<FilmManagingDto> findAllManaging() {
        return filmRepository.findAllManagingDtos();
    }

    public List<PosterDto> getPoster() {
        List<Film> enabledFilms = filmRepository.findAllByEnabled(true);
        return enabledFilms
                .stream()
                .map(filmMapper::toPosterDto)
                .toList();
    }

    @Transactional
    public void save(@Valid NewFilmDto newFilmDto) {
        Film film = filmMapper.toFilm(newFilmDto);
        filmRepository.save(film);
    }

    @Transactional
    public void updateById(UUID id, boolean enabled) {
        Film filmToUpdate = filmRepository
                .findById(id)
                .orElseThrow(() -> new FilmNotFoundException(id));

        filmToUpdate.setEnabled(enabled);
        filmRepository.save(filmToUpdate);
    }

    @Transactional
    public void deleteById(UUID id) {
        filmRepository.deleteById(id);
    }
}
