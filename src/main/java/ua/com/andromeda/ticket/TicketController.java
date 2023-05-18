package ua.com.andromeda.ticket;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/tickets")
@RequiredArgsConstructor
public class TicketController {
    private final TicketService ticketService;

    @GetMapping("/user")
    public ResponseEntity<List<TicketProfileDto>> getTicketsByUser(Principal principal) {
        return ResponseEntity.ok(ticketService.findAllByUsername(principal.getName()));
    }

    @PostMapping
    public ResponseEntity<Void> purchase(@RequestBody PurchaseDto purchaseDto, Principal principal) {
        ticketService.save(purchaseDto, principal.getName());
        return ResponseEntity.ok().contentLength(0).build();
    }
}