package ua.com.andromeda.exception.handler;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class ErrorResponse {
    private LocalDateTime timestamp = LocalDateTime.now();
    private List<String> messages;
    private String path;

    public ErrorResponse(List<String> messages, String path) {
        this.messages = messages;
        this.path = path;
    }
}
