package ua.com.andromeda.ticket;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.com.andromeda.user.User;
import ua.com.andromeda.user.UserService;

import java.security.Principal;

@RestController
@RequestMapping("/tickets")
@RequiredArgsConstructor
public class TicketController {
    private final TicketService ticketService;
    private final UserService userService;

    @PostMapping
    public ResponseEntity<String> purchase(@RequestBody PurchaseDto purchaseDto, Principal principal) {
        User user = userService.findByEmail(principal.getName()).get();
        ticketService.save(purchaseDto, user);
        return ResponseEntity.ok("Everything is ok! :-)");
    }
}