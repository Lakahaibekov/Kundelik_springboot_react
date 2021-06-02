package com.project.kundelik.rest;

import com.project.kundelik.entities.Cards;
import com.project.kundelik.entities.Course;
import com.project.kundelik.services.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/v1/public/courses")
public class CourseRestController {
    @Autowired
    private CourseService courseService;

    @GetMapping(value = "/read/all")
    public ResponseEntity<?> getAllCourses(@Param(value = "searchString") String searchString){
        List<Course> courses;
        System.out.println(searchString);
        if(searchString == null || searchString.equals("")) {
            courses = courseService.getAllCourses();
        }else{
            courses = courseService.getAllCourses();
        }
        return new ResponseEntity<>(courses, HttpStatus.OK);
    }

    @PostMapping (value = "/addcourse")
    public  ResponseEntity<?> addCourse(@RequestBody Course course){
        courseService.addCourse(course);
        return ResponseEntity.ok(course);
    }

    @GetMapping(value = "/read/one/{courseId}")
    public ResponseEntity<?> getCourseById(@PathVariable(name = "courseId") Integer courseId){
        Course course = null;
        System.out.println("courseId " + courseId);
        if(courseId != null) {
            course = courseService.getCourse(courseId.longValue());
        }
        return new ResponseEntity<>(course, HttpStatus.OK);
    }

    @PutMapping (value = "/savecourse")
    public  ResponseEntity<?> saveCourse(@RequestBody Course course){
        courseService.saveCourse(course);
        return ResponseEntity.ok(course);
    }

    @DeleteMapping(value = "/delete/one/{courseId}")
    public ResponseEntity<?> deleteCourse2(@PathVariable(name = "courseId") Long courseId){
        Course course = courseService.getCourse(courseId);
        if(course!=null){
            courseService.deleteCourse(course);
            return ResponseEntity.ok(course);
        }
        return ResponseEntity.ok(409);
    }

    @DeleteMapping(value = "/deletecourse")
    public ResponseEntity<?> deleteCourse(@RequestBody Course course){
        Course checkCourse = courseService.getCourse(course.getId());
        if(checkCourse!=null){
            courseService.deleteCourse(checkCourse);
            return ResponseEntity.ok(checkCourse);
        }
        return ResponseEntity.ok(course);
    }
}

