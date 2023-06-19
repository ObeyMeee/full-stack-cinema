package ua.com.andromeda.user;

import com.okta.sdk.client.Client;
import com.okta.sdk.resource.user.UserBuilder;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final Client oktaClient;

    public void register(@Valid UserDto userDto) {
        String email = userDto.getEmail();
        if (userExists(email)) {
            throw new UserAlreadyExistsException("User with this email already exists");
        }
        UserBuilder.instance()
                .setFirstName(userDto.getFirstName())
                .setLastName(userDto.getLastName())
                .setEmail(email)
                .setPassword(userDto.getPassword().toCharArray())
                .buildAndCreate(oktaClient);
    }

    private boolean userExists(String email) {
        return oktaClient.listUsers().stream()
                .map(u -> u.getProfile().getEmail())
                .anyMatch(email::equals);
    }
}
