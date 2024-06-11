package ua.com.andromeda.config;

import com.okta.spring.boot.oauth.Okta;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.accept.ContentNegotiationStrategy;
import org.springframework.web.accept.HeaderContentNegotiationStrategy;
import ua.com.andromeda.user.UserGroup;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class WebSecurityConfig {
    private static final String ADMIN = UserGroup.ADMIN.toString();

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests()
                .requestMatchers(HttpMethod.GET, "/films", "/films/{id}").permitAll()
                .requestMatchers(HttpMethod.GET, "/films/{id}/sessions", "/sessions/{id}").permitAll()
                .requestMatchers(HttpMethod.GET, "/films/{id}/comments").permitAll()
                .requestMatchers(HttpMethod.POST, "/users/new").permitAll()
                .requestMatchers(HttpMethod.DELETE, "/users/{userId}").hasAuthority(ADMIN)
                .requestMatchers(HttpMethod.PUT, "/users").hasAuthority(ADMIN)
                .requestMatchers(HttpMethod.GET, "/purchases").hasAuthority(ADMIN)
                .requestMatchers(HttpMethod.GET, "/films/manage").hasAuthority(ADMIN)
                .requestMatchers(HttpMethod.PATCH, "/films/id").hasAuthority(ADMIN)
                .requestMatchers(HttpMethod.DELETE, "/films/id").hasAuthority(ADMIN)
                .anyRequest().authenticated();
        http.oauth2ResourceServer().jwt();
        http.cors();
        http.csrf().disable();
        http.setSharedObject(ContentNegotiationStrategy.class, new HeaderContentNegotiationStrategy());
        Okta.configureResourceServer401ResponseBody(http);
        return http.build();
    }
}