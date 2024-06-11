package ua.com.andromeda.purchase;

import com.okta.sdk.resource.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ua.com.andromeda.purchase.dto.OrderNumberResponse;
import ua.com.andromeda.purchase.dto.PurchaseDto;
import ua.com.andromeda.purchase.dto.PurchaseProfileDto;
import ua.com.andromeda.purchase.dto.PurchaseStatsDto;
import ua.com.andromeda.user.UserService;

import java.security.Principal;
import java.util.Collection;
import java.util.List;

@RestController
@RequestMapping("/purchases")
@RequiredArgsConstructor
public class PurchaseController {
    private final PurchaseService purchaseService;
    private final UserService userService;

    @GetMapping("/user")
    public ResponseEntity<List<PurchaseProfileDto>> findAllByUser(Principal principal) {
        List<PurchaseProfileDto> purchases = purchaseService.findAllByUsername(principal.getName());
        return ResponseEntity.ok(purchases);
    }

    @GetMapping
    public ResponseEntity<Collection<PurchaseStatsDto>> findAll() {
        Collection<PurchaseStatsDto> purchases = purchaseService.findAll();
        return ResponseEntity.ok(purchases);
    }

    @PostMapping
    public ResponseEntity<OrderNumberResponse> purchase(@RequestBody PurchaseDto purchase, Principal principal) {
        User user = userService.findByLogin(principal);
        OrderNumberResponse orderNumber = purchaseService.save(purchase, user.getProfile().getEmail());
        return ResponseEntity.ok(orderNumber);
    }
}
