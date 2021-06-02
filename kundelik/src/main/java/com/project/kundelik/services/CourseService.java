package com.project.kundelik.services;
import com.project.kundelik.entities.Course;

import java.util.List;

public interface CourseService {

    Course addCourse(Course Course);
    List<Course> getAllCourses();
    Course getCourse(Long id);
    void deleteCourse(Course Course);
    Course saveCourse(Course Course);
}
