package com.ibyte.Sweetshop.controller;

import com.ibyte.Sweetshop.repository.UserRepository;
import com.ibyte.Sweetshop.service.SweetService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserRepository userRepository;

    private final com.ibyte.Sweetshop.service.SweetService sweetService;

    public UserController(com.ibyte.Sweetshop.service.SweetService sweetService, UserRepository userRepository) {
        this.sweetService = sweetService;
        this.userRepository = userRepository;
    }


    //Fetch all sweets
    @GetMapping("/sweets")
    public org.springframework.http.ResponseEntity<java.util.List<com.ibyte.Sweetshop.model.Sweet>> getAllSweets() {
        return org.springframework.http.ResponseEntity.ok(sweetService.getAllSweets());
    }

    //Purchase a sweet
    @PostMapping("/purchase/{id}")
    public org.springframework.http.ResponseEntity<String> purchaseSweet(@PathVariable Long id) {
        try {
            sweetService.purchaseSweet(id, 1);
            return org.springframework.http.ResponseEntity.ok("Purchase successful");
        } catch (Exception e) {
            return org.springframework.http.ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
