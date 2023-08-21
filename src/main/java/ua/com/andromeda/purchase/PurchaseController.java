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
        List<PurchaseProfileDto> purchases = purchaseService.findAllByUsername(principal.getName());
        return ResponseEntity.ok(purchases);
    }

    @PostMapping
    public ResponseEntity<OrderNumberResponse> purchase(@RequestBody PurchaseDto purchase, Principal principal) {
        OrderNumberResponse orderNumber = purchaseService.save(purchase, principal.getName());
        return ResponseEntity.ok(orderNumber);
    }
}
