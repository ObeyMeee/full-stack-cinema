package ua.com.andromeda.film.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class CrewDto {
    private List<CrewMemberDto> directors;
    private List<CrewMemberDto> screenwriters;
    private List<CrewMemberDto> actors;
}
