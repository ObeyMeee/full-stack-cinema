package ua.com.andromeda.user;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/new")
    public ResponseEntity<String> register(@RequestBody @Valid UserRegisterDto userRegisterDto) {
        userService.register(userRegisterDto, Set.of("Users"));
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<List<UserTableDto>> getAll() {
        List<UserTableDto> users = userService.findAll();
        return ResponseEntity.ok(users);
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> delete(@PathVariable String userId) {
        userService.delete(userId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping
    public ResponseEntity<UserTableDto> update(@RequestBody UserTableDto user) {
        UserTableDto updated = userService.update(user);
        return ResponseEntity.ok(updated);
    }

    @PatchMapping
    public ResponseEntity<Void> update(@RequestBody Map<String, Object> fields, Principal principal) {
        userService.update(fields, principal);
        return ResponseEntity.noContent().build();
    }
}
