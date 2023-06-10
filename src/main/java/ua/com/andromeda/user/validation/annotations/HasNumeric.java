package ua.com.andromeda.user.validation.annotations;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import ua.com.andromeda.user.validation.HasNumericValidator;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = HasNumericValidator.class)
public @interface HasNumeric {
    String message() default "Value does not have any digits";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
