package com.project.kundelik.services;
import com.project.kundelik.entities.Group;

import java.util.List;

public interface GroupService {

    Group addGroup(Group group);
    List<Group> getAllGroups();
    Group getGroup(Long id);
    void deleteGroup(Group group);
    Group saveGroup(Group group);

    List<Group> getGroupsByTeacherId(Integer teacherId);
}
