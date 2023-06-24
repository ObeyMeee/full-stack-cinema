package ua.com.andromeda.film;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import ua.com.andromeda.film.dto.PosterDto;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@SpringBootTest
@ExtendWith(SpringExtension.class)
class FilmServiceTest {
    @MockBean
    FilmRepository filmRepository;

    @MockBean
    Mapper mapper;

    @Autowired
    FilmService target;

    @Test
    void getPoster() {
        // init
        List<Film> films = List.of(new Film(), new Film(), new Film());

        // config
        when(filmRepository.findAllByEnabled(true)).thenReturn(films);
        when(mapper.toPosterDto(any(Film.class))).thenReturn(new PosterDto());

        // method invocation
        List<PosterDto> result = target.getPoster();

        // test
        verify(filmRepository, times(1)).findAllByEnabled(true);
        verify(mapper, times(3)).toPosterDto(any(Film.class));
        assertEquals(films.size(), result.size());
    }
}