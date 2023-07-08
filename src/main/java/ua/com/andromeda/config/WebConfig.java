package ua.com.andromeda.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.format.FormatterRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import ua.com.andromeda.config.converter.StringToCommentSortEnumConverter;
import ua.com.andromeda.config.converter.StringToDirectionEnumConverter;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addFormatters(FormatterRegistry registry) {
        registry.addConverter(new StringToCommentSortEnumConverter());
        registry.addConverter(new StringToDirectionEnumConverter());
    }
}
