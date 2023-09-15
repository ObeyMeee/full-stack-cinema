package ua.com.andromeda.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import ua.com.andromeda.user.validation.annotations.HasLowerCase;
import ua.com.andromeda.user.validation.annotations.HasNumeric;
import ua.com.andromeda.user.validation.annotations.HasUpperCase;

@Data
public class UserRegisterDto {
    @NotBlank(message = "Login cannot be empty")
    @Size(min = 5, message = "Login must be at least 5 character long")
    private String login;

    @Email(message = "Invalid email address")
    private String email;

    @Size(min = 8, message = "Password must be at least 8 characters long")
    @HasUpperCase(message = "Password must contain at least 1 uppercase letter")
    @HasLowerCase(message = "Password must contain at least 1 lowercase letter")
    @HasNumeric(message = "Password must contain at least 1 digit")
    private String password;
}
