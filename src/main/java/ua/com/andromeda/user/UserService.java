package ua.com.andromeda.user;

import com.okta.sdk.client.Client;
import com.okta.sdk.resource.group.Group;
import com.okta.sdk.resource.user.User;
import com.okta.sdk.resource.user.UserBuilder;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import ua.com.andromeda.user.exception.UserAlreadyExistsException;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {
    private final Client oktaClient;

    public void register(@Valid UserDto userDto, Set<String> groupsNames) {
        String email = userDto.getEmail();
        if (userExists(email)) {
            throw new UserAlreadyExistsException("User with this email already exists");
        }
        Set<String> groupIds = getGroupIds(groupsNames);
        UserBuilder.instance()
                .setFirstName(userDto.getFirstName())
                .setLastName(userDto.getLastName())
                .setEmail(email)
                .setPassword(userDto.getPassword().toCharArray())
                .setGroups(groupIds)
                .buildAndCreate(oktaClient);
    }

    private boolean userExists(String email) {
        return oktaClient.listUsers().stream()
                .map(u -> u.getProfile().getEmail())
                .anyMatch(email::equals);
    }

    private Set<String> getGroupIds(Set<String> groupsNames) {
        return oktaClient.listGroups()
                .stream()
                .filter(group -> groupsNames.contains(group.getProfile().getName()))
                .map(Group::getId)
                .collect(Collectors.toSet());
    }

    public Page<User> findAll(int page, int size) {
        List<User> allUsers = getAll();
        Pageable pageable = PageRequest.of(page, size);
        int offset = page * size;
        List<User> pageContent = allUsers.stream()
                .skip(offset)
                .limit(size)
                .toList();
        return new PageImpl<>(pageContent, pageable, allUsers.size());
    }

    private List<User> getAll() {
        return oktaClient.listUsers()
                .stream()
                .toList();
    }

    public void delete(String id) {
        oktaClient.getUser(id).delete(true);
    }
}
