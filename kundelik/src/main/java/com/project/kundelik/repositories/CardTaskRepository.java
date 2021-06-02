package com.project.kundelik.repositories;

import com.project.kundelik.entities.CardTasks;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface CardTaskRepository extends JpaRepository<CardTasks, Long> {
    List<CardTasks> findAllByCardId(Long card_id);
}
