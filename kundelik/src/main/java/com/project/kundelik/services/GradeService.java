package com.project.kundelik.services;
import com.project.kundelik.entities.Grade;

import java.util.List;

public interface GradeService {

    Grade addGrade(Grade grade);
    List<Grade> getAllGrades();
    Grade getGrade(Long id);
    void deleteGrade(Grade grade);
    Grade saveGrade(Grade grade);

    List<Grade> getGradesByStudentId(Integer studentId);

    List<Grade> getGradesByLessonId(Integer lessonId);
}
