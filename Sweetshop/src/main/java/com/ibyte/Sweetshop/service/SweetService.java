package com.ibyte.Sweetshop.service;

import com.ibyte.Sweetshop.dto.SweetDTO;
import com.ibyte.Sweetshop.model.Sweet;
import com.ibyte.Sweetshop.repository.SweetRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SweetService {

    private final SweetRepository sweetRepository;

    public SweetService(SweetRepository sweetRepository) {
        this.sweetRepository = sweetRepository;
    }

    public Sweet addSweet(SweetDTO sweetDTO) {
        Sweet sweet = new Sweet();
        sweet.setName(sweetDTO.getName());
        sweet.setCategory(sweetDTO.getCategory());
        sweet.setPrice(sweetDTO.getPrice());
        sweet.setQuantity(sweetDTO.getQuantity());
        sweet.setImageUrl(sweetDTO.getImageUrl());
        return sweetRepository.save(sweet);
    }

    // Retrieve all sweets from the database

    public List<Sweet> getAllSweets() {
        return sweetRepository.findAll();
    }
    
    public Sweet updateSweet(Long id, SweetDTO sweetDTO) throws Exception {
        Sweet sweet = sweetRepository.findById(id).orElseThrow(() -> new Exception("Sweet not found"));
        sweet.setName(sweetDTO.getName());
        sweet.setCategory(sweetDTO.getCategory());
        sweet.setPrice(sweetDTO.getPrice());
        sweet.setQuantity(sweetDTO.getQuantity());
        sweet.setQuantity(sweetDTO.getQuantity());
        // Only update image URL if a new image was uploaded
        if (sweetDTO.getImageUrl() != null) {
            sweet.setImageUrl(sweetDTO.getImageUrl());
        }
        return sweetRepository.save(sweet);
    }

    public void deleteSweet(Long id) throws Exception {
        if (!sweetRepository.existsById(id)) {
            throw new Exception("Sweet not found");
        }
        sweetRepository.deleteById(id);
    }
    public void purchaseSweet(Long id, int quantity) throws Exception {
        Sweet sweet = sweetRepository.findById(id).orElseThrow(() -> new Exception("Sweet not found"));
        if (sweet.getQuantity() < quantity) {
            throw new Exception("Insufficient stock");
        }
            
        // Deduct quantity from inventory
        sweet.setQuantity(sweet.getQuantity() - quantity);
        sweetRepository.save(sweet);
    }
}
