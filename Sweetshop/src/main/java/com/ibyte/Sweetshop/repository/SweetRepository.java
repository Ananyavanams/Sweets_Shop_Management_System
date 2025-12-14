package com.ibyte.Sweetshop.repository;

import com.ibyte.Sweetshop.model.Sweet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SweetRepository extends JpaRepository<Sweet, Long> {
}
