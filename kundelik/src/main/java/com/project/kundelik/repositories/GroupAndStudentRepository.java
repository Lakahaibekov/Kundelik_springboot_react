package com.project.kundelik.repositories;

import com.project.kundelik.entities.Group;
import com.project.kundelik.entities.GroupAndStudent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Repository
@Transactional
public interface GroupAndStudentRepository extends JpaRepository<GroupAndStudent, Long> {
    GroupAndStudent getDistinctByStudentId(Integer studentId);
    List<GroupAndStudent> getAllByGroupId(Integer groupId);
    GroupAndStudent getAllByStudentId(Integer studentId);
}
