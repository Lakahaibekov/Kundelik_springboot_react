package com.project.kundelik.services.impl;

import com.project.kundelik.entities.Group;
import com.project.kundelik.entities.GroupAndStudent;
import com.project.kundelik.repositories.GroupAndStudentRepository;
import com.project.kundelik.services.GroupAndStudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GroupAndStudentServiceImpl implements GroupAndStudentService {

    @Autowired
    private GroupAndStudentRepository groupAndStudentRepository;


    @Override
    public GroupAndStudent addGroupAndStudent(GroupAndStudent groupAndStudent) {
        return groupAndStudentRepository.saveAndFlush(groupAndStudent);
    }

    @Override
    public List<GroupAndStudent> getAllGroupAndStudents() {
        return groupAndStudentRepository.findAll();
    }

    @Override
    public GroupAndStudent getGroupAndStudent(Long id) {
        return groupAndStudentRepository.getOne(id);
    }

    @Override
    public void deleteGroupAndStudent(GroupAndStudent groupAndStudent) {
        groupAndStudentRepository.delete(groupAndStudent);
    }

    @Override
    public GroupAndStudent saveGroupAndStudent(GroupAndStudent groupAndStudent) {
        return groupAndStudentRepository.saveAndFlush(groupAndStudent);
    }

    @Override
    public List<GroupAndStudent> getGroupAndStudentsByGroupId(Integer groupId) {
        return groupAndStudentRepository.getAllByGroupId(groupId);
    }

    @Override
    public GroupAndStudent getGroupAndStudentsByStudentId(Integer studentId) {
        return groupAndStudentRepository.getAllByStudentId(studentId);
    }
}
