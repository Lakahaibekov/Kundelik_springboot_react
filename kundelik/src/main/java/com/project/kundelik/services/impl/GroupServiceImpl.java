package com.project.kundelik.services.impl;

import com.project.kundelik.entities.Group;
import com.project.kundelik.repositories.GroupRepository;
import com.project.kundelik.services.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GroupServiceImpl implements GroupService {

    @Autowired
    private GroupRepository groupRepository;

    @Override
    public Group addGroup(Group group) {
        return groupRepository.saveAndFlush(group);
    }

    @Override
    public List<Group> getAllGroups() {
        return groupRepository.findAll();
    }

    @Override
    public Group getGroup(Long id) {
        return groupRepository.findById(id).get();
    }

    @Override
    public void deleteGroup(Group group) {
        groupRepository.delete(group);
    }

    @Override
    public Group saveGroup(Group group) {
        return groupRepository.saveAndFlush(group);
    }

    @Override
    public List<Group> getGroupsByTeacherId(Integer teacherId) {
        return groupRepository.getAllByAdviserId(teacherId);
    }
}
