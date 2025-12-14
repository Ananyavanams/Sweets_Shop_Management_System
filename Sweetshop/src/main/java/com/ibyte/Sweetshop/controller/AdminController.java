package com.ibyte.Sweetshop.controller;

import com.ibyte.Sweetshop.repository.AdminRepository;
import com.ibyte.Sweetshop.service.SweetService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
public class AdminController {

    private final SweetService sweetService;
    private final AdminRepository adminRepository;
    private final com.ibyte.Sweetshop.service.ImageService imageService;

    public AdminController(SweetService sweetService, AdminRepository adminRepository, com.ibyte.Sweetshop.service.ImageService imageService) {
        this.sweetService = sweetService;
        this.adminRepository = adminRepository;
        this.imageService = imageService;
    }
    // Allows ADMIN to add a new sweet Accepts multipart/form-data because image upload is involved

    @PostMapping(value = "/sweets", consumes = "multipart/form-data")
    public ResponseEntity<?> addSweet(
            @RequestParam("name") String name,
            @RequestParam("category") String category,
            @RequestParam("price") Double price,
            @RequestParam("quantity") Integer quantity,
            @RequestParam("image") org.springframework.web.multipart.MultipartFile image) {


        try {
            // Validate image input (image is mandatory while adding a sweet)
            String imageUrl = null;

            if (image != null && !image.isEmpty()) {
                String fileName = imageService.storeFile(image);
                imageUrl = "http://localhost:8080/uploads/" + fileName;
            } else {
                 throw new RuntimeException("Image is required / Empty file received");
            }
             // Create DTO to transfer data to service layer
            com.ibyte.Sweetshop.dto.SweetDTO sweetDTO = new com.ibyte.Sweetshop.dto.SweetDTO(null, name, category, price, quantity, imageUrl);
            // Delegate creation logic to service layer
            com.ibyte.Sweetshop.model.Sweet createdSweet = sweetService.addSweet(sweetDTO);
            return ResponseEntity.status(org.springframework.http.HttpStatus.CREATED).body(createdSweet);
        } catch (Exception e) {
            return ResponseEntity.status(org.springframework.http.HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    //Fetch all sweets (Admin view)
    @GetMapping("/sweets")
    public ResponseEntity<java.util.List<com.ibyte.Sweetshop.model.Sweet>> getAllSweets() {
        return ResponseEntity.ok(sweetService.getAllSweets());
    }
    //Update existing sweet details
    @PutMapping(value = "/sweets/{id}", consumes = "multipart/form-data")
    public ResponseEntity<?> updateSweet(
            @PathVariable Long id, 
            @RequestParam("name") String name,
            @RequestParam("category") String category,
            @RequestParam("price") Double price,
            @RequestParam("quantity") Integer quantity,
            @RequestParam(value = "image", required = false) org.springframework.web.multipart.MultipartFile image) {
        try {


            // If admin uploads a new image, replace existing one
            String imageUrl = null;
            if (image != null && !image.isEmpty()) {
                String fileName = imageService.storeFile(image);
                imageUrl = "http://localhost:8080/uploads/" + fileName;
            }
            
            // DTO is used to carry updated fields to service layer
            com.ibyte.Sweetshop.dto.SweetDTO sweetDTO = new com.ibyte.Sweetshop.dto.SweetDTO(id, name, category, price, quantity, imageUrl);
            // Service layer decides how to handle null imageUrl
            com.ibyte.Sweetshop.model.Sweet updatedSweet = sweetService.updateSweet(id, sweetDTO);
            return ResponseEntity.ok(updatedSweet);
        } catch (Exception e) {
            return ResponseEntity.status(org.springframework.http.HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
    //Delete a sweet by ID
    @DeleteMapping("/sweets/{id}")
    public ResponseEntity<?> deleteSweet(@PathVariable Long id) {
        try {
            sweetService.deleteSweet(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(org.springframework.http.HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}
