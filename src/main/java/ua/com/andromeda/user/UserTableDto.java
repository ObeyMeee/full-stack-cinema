package ua.com.andromeda.user;

import com.okta.sdk.resource.user.User;
import com.okta.sdk.resource.user.UserProfile;
import com.okta.sdk.resource.user.UserStatus;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
public class UserTableDto {
    @NotEmpty
    private String id;

    @Email(message = "Invalid email address")
    private String email;

    @NotEmpty(message = "First name cannot be empty")
    @Size(min = 1, max = 50, message = "First name cannot be more than 50 characters long")
    private String firstName;

    @NotEmpty(message = "Last name cannot be empty")
    @Size(min = 1, max = 50, message = "Last name cannot be more than 50 characters long")
    private String lastName;

    private String phone;

    @NotEmpty
    private UserStatus status;

    private Date created;

    public UserTableDto(User user) {
        UserProfile profile = user.getProfile();
        this.id = user.getId();
        this.email = profile.getEmail();
        this.firstName = profile.getFirstName();
        this.lastName = profile.getLastName();
        this.phone = profile.getMobilePhone();
        this.status = user.getStatus();
        this.created = user.getCreated();
    }
}
