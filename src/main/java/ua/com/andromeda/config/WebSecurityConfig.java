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

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class WebSecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests()
                .requestMatchers(HttpMethod.GET, "/films", "/films/{id}").permitAll()
                .requestMatchers(HttpMethod.GET, "/films/{id}/sessions", "/sessions/{id}").permitAll()
                .requestMatchers(HttpMethod.GET, "/films/{id}/comments").permitAll()
                .requestMatchers(HttpMethod.POST, "/users/new").permitAll()
                .anyRequest().authenticated();
        http.oauth2ResourceServer().jwt();
        http.cors();
        http.csrf().disable();
        http.setSharedObject(ContentNegotiationStrategy.class, new HeaderContentNegotiationStrategy());
        Okta.configureResourceServer401ResponseBody(http);
        return http.build();
    }
}