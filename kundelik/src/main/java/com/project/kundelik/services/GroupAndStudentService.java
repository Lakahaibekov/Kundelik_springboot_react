package com.project.kundelik.services;
import com.project.kundelik.entities.GroupAndStudent;

import java.util.List;

public interface GroupAndStudentService {

    GroupAndStudent addGroupAndStudent(GroupAndStudent groupAndStudent);
    List<GroupAndStudent> getAllGroupAndStudents();
    GroupAndStudent getGroupAndStudent(Long id);
    void deleteGroupAndStudent(GroupAndStudent groupAndStudent);
    GroupAndStudent saveGroupAndStudent(GroupAndStudent groupAndStudent);
    List<GroupAndStudent> getGroupAndStudentsByGroupId(Integer groupId);
    GroupAndStudent getGroupAndStudentsByStudentId(Integer studentId);
}
