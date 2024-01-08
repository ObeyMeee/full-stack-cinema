package ua.com.andromeda.film.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class MediaDto {
    private MultipartFile poster;
    private String trailer;
}
