package ua.com.andromeda.film;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.com.andromeda.film.dto.PosterDto;

import java.util.List;

@Service
public class FilmService {
    private final FilmRepository filmRepository;
    private final Mapper mapper;

    @Autowired
    public FilmService(FilmRepository filmRepository, Mapper mapper) {
        this.filmRepository = filmRepository;
        this.mapper = mapper;
    }


    public List<PosterDto> getPoster() {
        List<Film> enabledFilms = filmRepository.findAllByEnabled(true);
        return enabledFilms.stream()
                .map(mapper::toPosterDto)
                .toList();
    }
}
