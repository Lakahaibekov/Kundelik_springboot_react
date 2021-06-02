package com.project.kundelik.services.impl;

import com.project.kundelik.entities.Grade;
import com.project.kundelik.repositories.GradeRepository;
import com.project.kundelik.services.GradeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GradeServiceImpl implements GradeService {

    @Autowired
    private GradeRepository gradeRepository;

    @Override
    public Grade addGrade(Grade grade) {
        return gradeRepository.saveAndFlush(grade);
    }

    @Override
    public List<Grade> getAllGrades() {
        return gradeRepository.findAll();
    }

    @Override
    public Grade getGrade(Long id) {
        return gradeRepository.getOne(id);
    }

    @Override
    public void deleteGrade(Grade grade) {
        gradeRepository.delete(grade);
    }

    @Override
    public Grade saveGrade(Grade grade) {
        return gradeRepository.saveAndFlush(grade);
    }

    @Override
    public List<Grade> getGradesByStudentId(Integer studentId) {
        return gradeRepository.getAllByStudentId(studentId);
    }

    @Override
    public List<Grade> getGradesByLessonId(Integer lessonId) {
        return gradeRepository.getAllByLessonId(lessonId);
    }
}
