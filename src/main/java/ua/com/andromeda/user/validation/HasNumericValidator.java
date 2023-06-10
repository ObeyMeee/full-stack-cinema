package ua.com.andromeda.user.validation;

import ua.com.andromeda.user.validation.annotations.HasNumeric;

public class HasNumericValidator extends HasRegexValidator<HasNumeric> {
    public HasNumericValidator() {
        super.regex = "\\d";
    }
}
