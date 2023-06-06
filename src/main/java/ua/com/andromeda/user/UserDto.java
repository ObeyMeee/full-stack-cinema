package ua.com.andromeda.user;

import lombok.Data;

@Data
public class UserDto {
    private String email;
    private String firstName;
    private String lastName;
    private String password;
}
