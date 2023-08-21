package ua.com.andromeda.config.converter;

import com.okta.sdk.resource.user.UserStatus;
import org.springframework.core.convert.converter.Converter;

public class StringToUserStatusEnumConverter implements Converter<String, UserStatus> {
    @Override
    public UserStatus convert(String source) {
        return UserStatus.valueOf(source);
    }
}
