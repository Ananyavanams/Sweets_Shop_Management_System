package com.ibyte.Sweetshop.service;

import com.ibyte.Sweetshop.dto.UserDTO;
import com.ibyte.Sweetshop.model.Admin;
import com.ibyte.Sweetshop.model.User;
import com.ibyte.Sweetshop.repository.AdminRepository;
import com.ibyte.Sweetshop.repository.UserRepository;
import com.ibyte.Sweetshop.security.JwtUtil;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthenticationService {

    private final AdminRepository adminRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthenticationService(AdminRepository adminRepository, 
                                 UserRepository userRepository, 
                                 PasswordEncoder passwordEncoder, 
                                 JwtUtil jwtUtil) {
        this.adminRepository = adminRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public String loginAdmin(String email, String password) {
        Optional<Admin> adminOptional = adminRepository.findByEmail(email);

        if (adminOptional.isPresent()) {
            Admin admin = adminOptional.get();
            if (passwordEncoder.matches(password, admin.getPasswordHash())) {
                // Verify password and generate JWT token for Admin
                return jwtUtil.generateToken(admin.getEmail(), "ADMIN");
            }
        }
        throw new BadCredentialsException("Invalid admin credentials");
    }

    public String loginUser(String email, String password) {
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (passwordEncoder.matches(password, user.getPasswordHash())) {
                // Verify password and generate JWT token for User
                return jwtUtil.generateToken(user.getEmail(), "USER");
            }
        }
        throw new BadCredentialsException("Invalid user credentials");
    }

    public User registerUser(UserDTO userDTO, String password) throws Exception {
        if (userRepository.findByEmail(userDTO.getEmail()).isPresent()) {
            throw new Exception("User with this email already exists");
        }

        User user = new User();
        user.setName(userDTO.getName());
        user.setEmail(userDTO.getEmail());
        // Encode password before saving to database for security
        user.setPasswordHash(passwordEncoder.encode(password));

        return userRepository.save(user);
    }

    public Admin registerAdmin(com.ibyte.Sweetshop.dto.AdminDTO adminDTO, String password) throws Exception {
        if (adminRepository.findByEmail(adminDTO.getEmail()).isPresent()) {
            throw new Exception("Admin with this email already exists");
        }

        Admin admin = new Admin();
        admin.setName(adminDTO.getName());
        admin.setEmail(adminDTO.getEmail());
        admin.setPasswordHash(passwordEncoder.encode(password));

        return adminRepository.save(admin);
    }
}
