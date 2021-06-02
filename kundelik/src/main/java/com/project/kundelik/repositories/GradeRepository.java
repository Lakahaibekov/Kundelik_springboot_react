package com.project.kundelik.repositories;

import com.project.kundelik.entities.Grade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Repository
@Transactional
public interface GradeRepository extends JpaRepository<Grade, Long> {
    List<Grade> getAllByStudentId(Integer studentId);
    List<Grade> getAllByLessonId(Integer lessonId);
}
