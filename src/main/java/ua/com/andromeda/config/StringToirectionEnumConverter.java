package ua.com.andromeda.config;

import org.springframework.core.convert.converter.Converter;
import org.springframework.data.domain.Sort;

public class StringToirectionEnumConverter implements Converter<String, Sort.Direction> {
    @Override
    public Sort.Direction convert(String source) {
        try {
            return Sort.Direction.valueOf(source);
        } catch (IllegalArgumentException ex) {
            return Sort.Direction.ASC;
        }
    }
}
