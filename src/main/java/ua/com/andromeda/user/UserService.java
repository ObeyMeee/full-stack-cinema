package ua.com.andromeda.user;

import com.okta.sdk.client.Client;
import com.okta.sdk.resource.user.UserBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final Client oktaClient;
    public void register(UserDto userDto) {
        UserBuilder.instance()
                .setEmail(userDto.getEmail())
                .setFirstName(userDto.getFirstName())
                .setLastName(userDto.getLastName())
                .setPassword(userDto.getPassword().toCharArray())
                .buildAndCreate(oktaClient);
    }
}
