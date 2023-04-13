package ua.com.andromeda.ticket;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/tickets")
@RequiredArgsConstructor
public class TicketController {
    private final TicketService ticketService;

    @PostMapping
    public ResponseEntity<String> purchase(@RequestBody PurchaseDto purchaseDto, Principal principal) {
        ticketService.save(purchaseDto, principal.getName());
        return ResponseEntity.ok("Everything is ok! :-)");
    }
}