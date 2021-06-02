package com.project.kundelik.services.impl;

import com.project.kundelik.entities.GroupAndStudent;
import com.project.kundelik.entities.Lesson;
import com.project.kundelik.repositories.GroupAndStudentRepository;
import com.project.kundelik.repositories.LessonRepository;
import com.project.kundelik.services.LessonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LessonServiceImpl implements LessonService {

    @Autowired
    private LessonRepository lessonRepository;

    @Autowired
    private GroupAndStudentRepository groupAndStudentRepository;


    @Override
    public Lesson addLesson(Lesson lesson) {
        return lessonRepository.saveAndFlush(lesson);
    }

    @Override
    public List<Lesson> getAllLessons() {
        return lessonRepository.findAll();
    }

    public Lesson getLesson(Long id) {
        return lessonRepository.getById(id);
    }

    @Override
    public void deleteLesson(Lesson lesson) {
        lessonRepository.delete(lesson);
    }

    @Override
    public Lesson saveLesson(Lesson lesson) {
        return lessonRepository.saveAndFlush(lesson);
    }

    @Override
    public List<Lesson> getLessonsByGroupId(Integer groupId) {
        return lessonRepository.getAllByGroupId(groupId);
    }

    @Override
    public List<Lesson> getLessonsByStudentId(Integer studentId) {
        GroupAndStudent groupAndStudent = groupAndStudentRepository.getDistinctByStudentId(studentId);
        if (groupAndStudent!=null){
            return lessonRepository.getAllByGroupId(groupAndStudent.getGroupId());
        }
        return null;
    }

    @Override
    public List<Lesson> getLessonsByTeacherId(Integer teacherId) {
        return lessonRepository.getAllByTeacherId(teacherId);
    }
}
