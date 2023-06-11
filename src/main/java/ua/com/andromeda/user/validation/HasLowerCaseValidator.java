package ua.com.andromeda.user.validation;

import ua.com.andromeda.user.validation.annotations.HasLowerCase;

public class HasLowerCaseValidator extends HasRegexValidator<HasLowerCase> {
    public HasLowerCaseValidator() {
        super.regex = "[a-z]";
    }
}
