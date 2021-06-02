package com.project.kundelik.repositories;

import com.project.kundelik.entities.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;


@Repository
@Transactional
public interface CourseRepository extends JpaRepository<Course, Long> {
    Course getById(Long id);
}
