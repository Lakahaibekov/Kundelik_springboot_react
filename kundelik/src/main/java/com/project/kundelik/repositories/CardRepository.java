package com.project.kundelik.repositories;

import com.project.kundelik.entities.Cards;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface CardRepository extends JpaRepository<Cards, Long> {
    List<Cards> findAllByNameIsStartingWith(String name);
}
