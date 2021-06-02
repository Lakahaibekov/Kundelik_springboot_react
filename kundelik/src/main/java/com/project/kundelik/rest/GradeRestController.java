package com.project.kundelik.rest;

import com.project.kundelik.entities.Grade;
import com.project.kundelik.services.GradeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/v1/public/grades")
public class GradeRestController {
    @Autowired
    private GradeService gradeService;

    @GetMapping(value = "/read/all")
    public ResponseEntity<?> getAllGrades(@Param(value = "searchString") String searchString){
        List<Grade> grades;
        System.out.println(searchString);
        if(searchString == null || searchString.equals("")) {
            grades = gradeService.getAllGrades();
        }else{
            grades = gradeService.getAllGrades();
        }
        return new ResponseEntity<>(grades, HttpStatus.OK);
    }

    @GetMapping(value = "/read/all/student/{studentId}")
    public ResponseEntity<?> getAllGradesByStudentId(@PathVariable(name = "studentId") Integer studentId){
        List<Grade> grades = null;
        System.out.println("studentId," + studentId);
        if(studentId != null) {
            grades = gradeService.getGradesByStudentId(studentId);
        }
        return new ResponseEntity<>(grades, HttpStatus.OK);
    }

    @GetMapping(value = "/read/all/lesson/{lessonId}")
    public ResponseEntity<?> getAllGradesByLessonId(@PathVariable(name = "lessonId") Integer lessonId){
        List<Grade> grades = null;
        System.out.println("lessonId," + lessonId);
        if(lessonId != null) {
            grades = gradeService.getGradesByLessonId(lessonId);
        }
        return new ResponseEntity<>(grades, HttpStatus.OK);
    }

    @PostMapping (value = "/save/one")
    public  ResponseEntity<?> saveGrade(@RequestBody Grade grade){
        gradeService.addGrade(grade);
        return ResponseEntity.ok(grade);
    }

    @DeleteMapping(value = "/delete/one/{gradeId}")
    public ResponseEntity<?> deleteGrade(@PathVariable(name = "gradeId") Long gradeId){
        Grade grade = gradeService.getGrade(gradeId);
        if(grade!=null){
            gradeService.deleteGrade(grade);
            return ResponseEntity.ok(grade);
        }
        return ResponseEntity.ok(409);
    }
}

