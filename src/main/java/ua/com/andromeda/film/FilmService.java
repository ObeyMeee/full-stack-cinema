package ua.com.andromeda.film;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ua.com.andromeda.film.dto.PosterDto;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FilmService {
    private final FilmRepository filmRepository;
    private final Mapper mapper;

    public List<PosterDto> getPoster() {
        List<Film> enabledFilms = filmRepository.findAllByEnabled(true);
        return enabledFilms.stream()
                .map(mapper::toPosterDto)
                .toList();
    }
}
