package com.project.kundelik.services.impl;

import com.project.kundelik.entities.Course;
import com.project.kundelik.repositories.CourseRepository;
import com.project.kundelik.services.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseServiceImpl implements CourseService {

    @Autowired
    private CourseRepository courseRepository;


    @Override
    public Course addCourse(Course course) {
        return courseRepository.saveAndFlush(course);
    }

    @Override
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    @Override
    public Course getCourse(Long id) {
        return courseRepository.getById(id);
    }

    @Override
    public void deleteCourse(Course course) {
        courseRepository.delete(course);
    }

    @Override
    public Course saveCourse(Course course) {
        return courseRepository.saveAndFlush(course);
    }
}
