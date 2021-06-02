package com.project.kundelik.repositories;

import com.project.kundelik.entities.Group;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Repository
@Transactional
public interface GroupRepository extends JpaRepository<Group, Long> {
    List<Group> getAllByAdviserId(Integer teacherId);
}
