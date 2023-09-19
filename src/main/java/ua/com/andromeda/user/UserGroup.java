package ua.com.andromeda.user;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum UserGroup {
    USER("User"), ADMIN("Admin");

    private final String name;

    @Override
    public String toString() {
        return name;
    }
}
