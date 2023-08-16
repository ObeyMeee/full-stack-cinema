package ua.com.andromeda.purchase;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ua.com.andromeda.purchase.dto.OrderNumberResponse;
import ua.com.andromeda.purchase.dto.PurchaseDto;
import ua.com.andromeda.purchase.dto.PurchaseProfileDto;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/purchases")
@RequiredArgsConstructor
public class PurchaseController {
    private final PurchaseService purchaseService;

    @GetMapping("/user")
    public ResponseEntity<List<PurchaseProfileDto>> findAllByUser(Principal principal) {
        return ResponseEntity.ok(purchaseService.findAllByUsername(principal.getName()));
    }

    @PostMapping
    public ResponseEntity<OrderNumberResponse> purchase(@RequestBody PurchaseDto purchase, Principal principal) {
        return ResponseEntity.ok(purchaseService.save(purchase, principal.getName()));
    }
}
