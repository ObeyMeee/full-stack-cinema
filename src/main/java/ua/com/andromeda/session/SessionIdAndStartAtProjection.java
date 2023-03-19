package ua.com.andromeda.session;

import java.time.LocalDateTime;
import java.util.UUID;

public interface SessionIdAndStartAtProjection {
    UUID getId();

    LocalDateTime getStartAt();
}
