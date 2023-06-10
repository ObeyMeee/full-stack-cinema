package ua.com.andromeda.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;
import ua.com.andromeda.user.validation.annotations.HasLowerCase;
import ua.com.andromeda.user.validation.annotations.HasNumeric;
import ua.com.andromeda.user.validation.annotations.HasUpperCase;

@Data
public class UserDto {
    @Email(message = "Invalid email address")
    private String email;

    @NotEmpty(message = "First name cannot be empty")
    @Size(min = 1, max = 50, message = "First name cannot be more than 50 characters long")
    private String firstName;

    @NotEmpty(message = "Last name cannot be empty")
    @Size(min = 1, max = 50, message = "Last name cannot be more than 50 characters long")
    private String lastName;

    @Size(min = 8, message = "Password must be at least 8 characters long")
    @HasUpperCase(message = "Password must contain at least 1 uppercase letter")
    @HasLowerCase(message = "Password must contain at least 1 lowercase letter")
    @HasNumeric(message = "Password must contain at least 1 digit")
    private String password;
}
