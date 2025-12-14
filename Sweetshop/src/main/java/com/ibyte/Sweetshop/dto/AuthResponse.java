package com.ibyte.Sweetshop.dto;

// DTO for sending JWT token and user role back to client
public class AuthResponse {
    private String token;
    private String role;

    public AuthResponse() {
    }

    public AuthResponse(String token, String role) {
        this.token = token;
        this.role = role;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
