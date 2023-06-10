package ua.com.andromeda.user.validation;

import ua.com.andromeda.user.validation.annotations.HasUpperCase;

public class HasUpperCaseValidator extends HasRegexValidator<HasUpperCase> {
    public HasUpperCaseValidator() {
        super.regex = "[A-Z]";
    }
}
