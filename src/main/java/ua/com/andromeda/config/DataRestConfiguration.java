package ua.com.andromeda.config;

import jakarta.persistence.EntityManager;
import jakarta.persistence.metamodel.EntityType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import ua.com.andromeda.film.Film;
import ua.com.andromeda.session.Session;

import java.util.List;
import java.util.Set;

@Configuration
public class DataRestConfiguration implements RepositoryRestConfigurer {
    private final EntityManager entityManager;
    @Value("${allowed.origins}")
    private String[] allowedOrigins;

    @Autowired
    public DataRestConfiguration(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        HttpMethod[] unsupportedActions = {HttpMethod.DELETE, HttpMethod.POST, HttpMethod.PUT, HttpMethod.PATCH};
        List<Class<?>> classes = List.of(Film.class, Session.class);
        classes.forEach(clazz -> disableHttpMethods(config, unsupportedActions, clazz));
        cors.addMapping(config.getBasePath() + "/**").allowedOrigins(allowedOrigins);
        exposeIds(config);
    }

    private void disableHttpMethods(RepositoryRestConfiguration config, HttpMethod[] unsupportedActions, Class<?> clazz) {
        config.getExposureConfiguration()
                .forDomainType(clazz)
                .withItemExposure((metadata, httpMethods) -> httpMethods.disable(unsupportedActions))
                .withCollectionExposure((metadata, httpMethods) -> httpMethods.disable(unsupportedActions));

    }

    private void exposeIds(RepositoryRestConfiguration config) {
        Set<EntityType<?>> entityTypes = entityManager.getMetamodel().getEntities();
        Class<?>[] entityClasses = entityTypes.stream()
                .map(EntityType::getJavaType)
                .toArray(Class[]::new);
        config.exposeIdsFor(entityClasses);
    }
}
