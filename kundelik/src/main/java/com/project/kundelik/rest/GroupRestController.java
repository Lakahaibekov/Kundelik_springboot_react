package com.project.kundelik.rest;

import com.project.kundelik.entities.Course;
import com.project.kundelik.entities.Group;
import com.project.kundelik.entities.GroupAndStudent;
import com.project.kundelik.services.GroupAndStudentService;
import com.project.kundelik.services.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/v1/public/groups")
public class GroupRestController {
    @Autowired
    private GroupService groupService;

    @Autowired
    private GroupAndStudentService groupAndStudentService;

    @GetMapping(value = "/read/all")
    public ResponseEntity<?> getAllGroups(@Param(value = "searchString") String searchString){
        List<Group> groups;
        System.out.println(searchString);
        if(searchString == null || searchString.equals("")) {
            groups = groupService.getAllGroups();
        }else{
            groups = groupService.getAllGroups();
        }
        return new ResponseEntity<>(groups, HttpStatus.OK);
    }

    @PostMapping (value = "/addgroup")
    public  ResponseEntity<?> addGroup(@RequestBody Group group){
        groupService.addGroup(group);
        return ResponseEntity.ok(group);
    }

    @GetMapping(value = "/read/one/{groupId}")
    public ResponseEntity<?> getGroupById(@PathVariable(name = "groupId") Integer groupId){
        Group group = null;
        System.out.println("groupId" + groupId);
        if(groupId != null) {
            group = groupService.getGroup(groupId.longValue());
        }
        return new ResponseEntity<>(group, HttpStatus.OK);
    }

    @GetMapping(value = "/read/all/teacher/{teacherId}")
    public ResponseEntity<?> getGroupsByAdviserId(@PathVariable(name = "teacherId") Integer teacherId){
        List<Group> groups = null;
        System.out.println("teacherId" + teacherId);
        if(teacherId != null) {
            groups = groupService.getGroupsByTeacherId(teacherId);
        }
        return new ResponseEntity<>(groups, HttpStatus.OK);
    }

    @PutMapping (value = "/savegroup")
    public  ResponseEntity<?> saveCourse(@RequestBody Group group){
        groupService.addGroup(group);
        return ResponseEntity.ok(group);
    }

    @DeleteMapping(value = "/delete/one/{groupId}")
    public ResponseEntity<?> deleteGroup2(@PathVariable(name = "groupId") Long groupId){
        Group group = groupService.getGroup(groupId);
        if(group!=null){
            groupService.deleteGroup(group);
            return ResponseEntity.ok(group);
        }
        return ResponseEntity.ok(409);
    }

    @DeleteMapping(value = "/deletegroup")
    public ResponseEntity<?> deleteGroup(@RequestBody Group group){
        Group checkGroup = groupService.getGroup(group.getId());
        if(checkGroup!=null){
            groupService.deleteGroup(checkGroup);
            return ResponseEntity.ok(checkGroup);
        }
        return ResponseEntity.ok(group);
    }

//-------------------------- GroupAndStudent ------------------

    @GetMapping(value = "/read/all/groupandstudents")
    public ResponseEntity<?> getAllGroupAndStudents(@Param(value = "searchString") String searchString){
        List<GroupAndStudent> students;
        System.out.println(searchString);
        if(searchString == null || searchString.equals("")) {
            students = groupAndStudentService.getAllGroupAndStudents();
        }else{
            students = groupAndStudentService.getAllGroupAndStudents();
        }
        return new ResponseEntity<>(students, HttpStatus.OK);
    }

    @PostMapping (value = "/addgroupandstudents")
    public  ResponseEntity<?> addGroupAndStudents(@RequestBody GroupAndStudent group){
        groupAndStudentService.addGroupAndStudent(group);
        return ResponseEntity.ok(group);
    }

    @GetMapping(value = "/read/one/groupandstudents/{groupId}")
    public ResponseEntity<?> getGroupAndStudentsById(@PathVariable(name = "groupId") Integer groupId){
        GroupAndStudent group = null;
        System.out.println("groupId" + groupId);
        if(groupId != null) {
            group = groupAndStudentService.getGroupAndStudent(groupId.longValue());
        }
        return new ResponseEntity<>(group, HttpStatus.OK);
    }

    @DeleteMapping(value = "/delete/one/groupandstudents/{groupId}")
    public ResponseEntity<?> deleteGroupAndStudents2(@PathVariable(name = "groupId") Long groupId){
        GroupAndStudent group = groupAndStudentService.getGroupAndStudent(groupId);
        if(group!=null){
            groupAndStudentService.deleteGroupAndStudent(group);
            return ResponseEntity.ok(group);
        }
        return ResponseEntity.ok(409);
    }
}

