package ua.com.andromeda.user;

import com.okta.sdk.resource.user.User;
import com.okta.sdk.resource.user.UserProfile;
import com.okta.sdk.resource.user.UserStatus;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
public class UserTableDto {
    @NotBlank
    private String id;

    @NotBlank(message = "Login cannot be empty")
    @Size(min = 5, message = "Login must be at least 5 character long")
    private String login;

    @Email(message = "Invalid email address")
    private String email;

    @NotBlank(message = "First name cannot be empty")
    @Size(min = 1, max = 50, message = "First name cannot be more than 50 characters long")
    private String firstName;

    @NotBlank(message = "Last name cannot be empty")
    @Size(min = 1, max = 50, message = "Last name cannot be more than 50 characters long")
    private String lastName;

    private String phone;

    @NotBlank
    private UserStatus status;

    private Date created;

    public UserTableDto(User user) {
        UserProfile profile = user.getProfile();
        this.id = user.getId();
        this.email = profile.getEmail();
        this.login = profile.getLogin();
        this.firstName = profile.getFirstName();
        this.lastName = profile.getLastName();
        this.phone = profile.getMobilePhone();
        this.status = user.getStatus();
        this.created = user.getCreated();
    }
}
