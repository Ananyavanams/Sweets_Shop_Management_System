package com.ibyte.Sweetshop.controller;

import com.ibyte.Sweetshop.dto.AuthResponse;
import com.ibyte.Sweetshop.dto.LoginRequest;
import com.ibyte.Sweetshop.dto.RegisterRequest;
import com.ibyte.Sweetshop.dto.UserDTO;
import com.ibyte.Sweetshop.service.AuthenticationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }


    //Authenticate admin using email & password Generate JWT token with ADMIN role
    @PostMapping("/admin/login")
    public ResponseEntity<?> loginAdmin(@RequestBody LoginRequest loginRequest) {
        try {
            String token = authenticationService.loginAdmin(loginRequest.getEmail(), loginRequest.getPassword());
            return ResponseEntity.ok(new AuthResponse(token, "ADMIN"));
        } catch (BadCredentialsException e) {
            
            // Thrown when email or password is incorrect
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        } catch (Exception e) {
            
            // Any unexpected server-side error
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
        }
    }


    //Authenticate normal user Generate JWT token with USER role
    @PostMapping("/user/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        try {
            String token = authenticationService.loginUser(loginRequest.getEmail(), loginRequest.getPassword());
            return ResponseEntity.ok(new AuthResponse(token, "USER"));
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
        }
    }


    // Register a new user Hash password using BCrypt Save user in database Automatically log in user after registration
    @PostMapping("/user/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest registerRequest) {
        try {
            UserDTO userDTO = new UserDTO();
            userDTO.setName(registerRequest.getName());
            userDTO.setEmail(registerRequest.getEmail());

            // Register user (password hashing happens in service)
            authenticationService.registerUser(userDTO, registerRequest.getPassword());

            // Auto-login after successful registration
            String token = authenticationService.loginUser(registerRequest.getEmail(), registerRequest.getPassword());
            return ResponseEntity.status(HttpStatus.CREATED).body(new AuthResponse(token, "USER"));
            
        } catch (Exception e) {

            // Handles duplicate email or validation failures
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }


    //Register a new admin Hash password Save admin in database Auto-login admin and return JWT
    @PostMapping("/admin/register")
    public ResponseEntity<?> registerAdmin(@RequestBody RegisterRequest registerRequest) {
        try {
            com.ibyte.Sweetshop.dto.AdminDTO adminDTO = new com.ibyte.Sweetshop.dto.AdminDTO();
            adminDTO.setName(registerRequest.getName());
            adminDTO.setEmail(registerRequest.getEmail());
            
            // Register admin
            authenticationService.registerAdmin(adminDTO, registerRequest.getPassword());
            
            // Auto-login admin after registration
            String token = authenticationService.loginAdmin(registerRequest.getEmail(), registerRequest.getPassword());
            return ResponseEntity.status(HttpStatus.CREATED).body(new AuthResponse(token, "ADMIN"));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
