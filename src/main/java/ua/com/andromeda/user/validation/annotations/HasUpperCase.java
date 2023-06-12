package ua.com.andromeda.user.validation.annotations;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import ua.com.andromeda.user.validation.HasUpperCaseValidator;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = HasUpperCaseValidator.class)
public @interface HasUpperCase {
    String message() default "Value doesn't any uppercase characters";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
