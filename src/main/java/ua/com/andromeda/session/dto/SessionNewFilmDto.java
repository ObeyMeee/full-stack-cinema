package ua.com.andromeda.session.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
public class SessionNewFilmDto {
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSZ")
    @NotNull
    private LocalDateTime startAt;
    private int hall;
    private int goodRowPrice;
    private int luxRowPrice;
}
