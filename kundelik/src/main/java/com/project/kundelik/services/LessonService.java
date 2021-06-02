package com.project.kundelik.services;
import com.project.kundelik.entities.Lesson;

import java.util.List;

public interface LessonService {

    Lesson addLesson(Lesson lesson);
    List<Lesson> getAllLessons();
    Lesson getLesson(Long id);
    void deleteLesson(Lesson lesson);
    Lesson saveLesson(Lesson lesson);
    List<Lesson> getLessonsByGroupId(Integer groupId);
    List<Lesson> getLessonsByStudentId(Integer studentId);

    List<Lesson> getLessonsByTeacherId(Integer teacherId);
}
