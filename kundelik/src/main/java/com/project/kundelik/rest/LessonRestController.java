package com.project.kundelik.rest;

import com.project.kundelik.entities.Lesson;
import com.project.kundelik.services.LessonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/v1/public/lessons")
public class LessonRestController {
    @Autowired
    private LessonService lessonService;

    @GetMapping(value = "/read/all")
    public ResponseEntity<?> getAllLessons(@Param(value = "searchString") String searchString){
        List<Lesson> lessons;
        System.out.println(searchString);
        if(searchString == null || searchString.equals("")) {
            lessons = lessonService.getAllLessons();
        }else{
            lessons = lessonService.getAllLessons();
        }
        return new ResponseEntity<>(lessons, HttpStatus.OK);
    }

    @GetMapping(value = "/read/group/{groupId}")
    public ResponseEntity<?> getLessonsByGroupId(@PathVariable(name = "groupId") Integer groupId){
        List<Lesson> lessons = null;
        System.out.println("groupId" + groupId);
        if(groupId != null) {
            lessons = lessonService.getLessonsByGroupId(groupId);
        }
        return new ResponseEntity<>(lessons, HttpStatus.OK);
    }

    @GetMapping(value = "/read/student/{studentId}")
    public ResponseEntity<?> getLessonsByStudentId(@PathVariable(name = "studentId") Integer studentId){
        List<Lesson> lessons = null;
        System.out.println("studentId" + studentId);
        if(studentId != null) {
            lessons = lessonService.getLessonsByStudentId(studentId);
        }
        return new ResponseEntity<>(lessons, HttpStatus.OK);
    }

    @GetMapping(value = "/read/teacher/{teacherId}")
    public ResponseEntity<?> getLessonByTeacherId(@PathVariable(name = "teacherId") Integer teacherId){
        List<Lesson> lessons = null;
        System.out.println("teacherId" + teacherId);
        if(teacherId != null) {
            lessons = lessonService.getLessonsByTeacherId(teacherId);
        }
        return new ResponseEntity<>(lessons, HttpStatus.OK);
    }

    @GetMapping(value = "/read/one/{lessonId}")
    public ResponseEntity<?> getLessonById(@PathVariable(name = "lessonId") Integer lessonId){
        Lesson lesson = null;
        System.out.println("lessonId" + lessonId);
        if(lessonId != null) {
            lesson = lessonService.getLesson(lessonId.longValue());
        }
        return new ResponseEntity<>(lesson, HttpStatus.OK);
    }

    @PostMapping (value = "/save/one")
    public  ResponseEntity<?> saveLesson(@RequestBody Lesson lesson){
        lessonService.addLesson(lesson);
        return ResponseEntity.ok(lesson);
    }

    @DeleteMapping(value = "/delete/one/{lessonId}")
    public ResponseEntity<?> deleteLesson(@PathVariable(name = "lessonId") Long lessonId){
        Lesson lesson = lessonService.getLesson(lessonId);
        if(lesson!=null){
            lessonService.deleteLesson(lesson);
            return ResponseEntity.ok(lesson);
        }
        return ResponseEntity.ok(409);
    }
}

