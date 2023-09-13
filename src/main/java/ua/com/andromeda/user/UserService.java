package ua.com.andromeda.user;

import com.okta.sdk.client.Client;
import com.okta.sdk.resource.group.Group;
import com.okta.sdk.resource.user.User;
import com.okta.sdk.resource.user.UserBuilder;
import com.okta.sdk.resource.user.UserProfile;
import com.okta.sdk.resource.user.UserStatus;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import ua.com.andromeda.user.exception.UserAlreadyExistsException;
import ua.com.andromeda.user.exception.UserNotAuthenticatedException;

import java.security.Principal;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {
    private static final Logger LOGGER = LoggerFactory.getLogger(UserService.class);
    private final Client oktaClient;

    public List<UserTableDto> findAll() {
        return oktaClient.listUsers()
                .stream()
                .map(UserTableDto::new)
                .toList();
    }

    public void register(@Valid UserRegisterDto userRegisterDto, Set<String> groupsNames) {
        String email = userRegisterDto.getEmail();
        if (userExists(email)) {
            throw new UserAlreadyExistsException("User '" + email + "' already exists");
        }
        Set<String> groupIds = getGroupIds(groupsNames);
        UserBuilder.instance()
                .setFirstName(userRegisterDto.getFirstName())
                .setLastName(userRegisterDto.getLastName())
                .setEmail(email)
                .setPassword(userRegisterDto.getPassword().toCharArray())
                .setGroups(groupIds)
                .buildAndCreate(oktaClient);
        LOGGER.info("User {} registered", email);
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

    public void update(Map<String, Object> map, Principal principal) {
        User user = findByEmail(principal);
        UserProfile profile = user.getProfile();
        profile.putAll(map);
        user.update(true);
    }

    private User findByEmail(Principal principal) {
        String email = principal.getName();
        return oktaClient.listUsers(null, null, "profile.email eq \"" + email + "\"", null, null)
                .stream()
                .findAny()
                .orElseThrow(UserNotAuthenticatedException::new);
    }

    public UserTableDto update(UserTableDto user) {
        String userId = user.getId();
        User foundedUser = oktaClient.getUser(userId);
        UserCopy.copy(user, foundedUser);
        if (!user.getStatus().equals(UserStatus.DEPROVISIONED)) {
            oktaClient.partialUpdateUser(foundedUser, userId);
        }
        LOGGER.info("User {} is updated", userId);
        return user;
    }

    public void delete(String id) {
        User userToBeDeleted = oktaClient.getUser(id);
        userToBeDeleted.delete(true);
        LOGGER.info("User {} is deleted", id);
    }

    private static class UserCopy {
        public static void copy(UserTableDto from, User to) {
            UserProfile profile = to.getProfile();
            profile.setEmail(from.getEmail())
                    .setFirstName(from.getFirstName())
                    .setLastName(from.getLastName())
                    .setMobilePhone(from.getPhone());
            updateStatus(to, from.getStatus());
        }

        private static void updateStatus(User user, UserStatus newStatus) {
            UserStatus currentStatus = user.getStatus();
            if (currentStatus.equals(newStatus)) return;

            boolean sendEmail = true;
            switch (newStatus) {
                case ACTIVE -> activate(user, sendEmail);
                case PROVISIONED -> user.activate(sendEmail);
                case PASSWORD_EXPIRED -> user.expirePassword();
                case SUSPENDED -> user.suspend();
                case DEPROVISIONED -> user.deactivate(sendEmail);
                default -> throw new UnsupportedOperationException(
                        "User having " + currentStatus + " cannot receive " + newStatus
                );
            }
        }

        private static void activate(User user, boolean sendEmail) {
            UserStatus currentStatus = user.getStatus();
            switch (currentStatus) {
                case LOCKED_OUT -> user.unlock();
                case RECOVERY -> user.resetPassword(sendEmail);
                case STAGED -> user.activate(sendEmail);
                case SUSPENDED -> user.unsuspend();
                default -> throw new UnsupportedOperationException(
                        "User having " + currentStatus + " cannot be activated"
                );
            }
        }
    }
}
