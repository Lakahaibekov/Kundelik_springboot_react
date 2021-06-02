package com.project.kundelik.rest;

import com.project.kundelik.dto.UserDTO;
import com.project.kundelik.entities.Group;
import com.project.kundelik.entities.GroupAndStudent;
import com.project.kundelik.entities.Users;
import com.project.kundelik.services.GroupAndStudentService;
import com.project.kundelik.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/api")
public class UsersRestController {
    @Autowired
    private UserService userService;

    @Autowired
    private GroupAndStudentService groupAndStudentService;

    @GetMapping(value = "/v1/public/teachers/read/all")
    public ResponseEntity<?> getAllTeachers(@Param(value = "searchString") String searchString) {
        List<Users> teachers;
        System.out.println(searchString);
        if (searchString == null || searchString.equals("")) {
            //teachers = userService.getAllTeachers();
            teachers = userService.getAllTeachers();
        } else {
            teachers = userService.getAllTeachers();
        }
        List<UserDTO> userDTOS = new ArrayList<>();
        for (Users user : teachers) {
            userDTOS.add(new UserDTO(user.getId(), user.getEmail(), user.getFullName(), user.getRoles()));
        }
        return new ResponseEntity<>(userDTOS, HttpStatus.OK);
    }

    @GetMapping(value = "/v1/public/students/read/all")
    public ResponseEntity<?> getAllStudents(@Param(value = "searchString") String searchString) {
        List<Users> students;
        System.out.println(searchString);
        if (searchString == null || searchString.equals("")) {
            students = userService.getAllStudents();
        } else {
            students = userService.getAllStudents();
        }
        List<UserDTO> userDTOS = new ArrayList<>();
        for (Users user : students) {
            userDTOS.add(new UserDTO(user.getId(), user.getEmail(), user.getFullName(), user.getRoles()));
        }
        return new ResponseEntity<>(userDTOS, HttpStatus.OK);
    }

    @GetMapping(value = "/v1/public/users/read/one/{userId}")
    public ResponseEntity<?> getUserById(@PathVariable(name = "userId") Integer userId) {
        Users user;
        user = userService.getUser(userId.longValue());
        return new ResponseEntity<>(new UserDTO(user.getId(), user.getEmail(),user.getFullName(), user.getRoles()), HttpStatus.OK);
    }

    @GetMapping(value = "/v1/public/students/read/all/{groupId}")
    public ResponseEntity<?> getStudentsByGroupId(@PathVariable(name = "groupId") Integer groupId) {
        List<GroupAndStudent> students = null;
        System.out.println("groupId" + groupId);
        if (groupId != null) {
            students = groupAndStudentService.getGroupAndStudentsByGroupId(groupId);
        }
        return new ResponseEntity<>(students, HttpStatus.OK);
    }

    @GetMapping(value = "/v1/public/student/group/read/all/{studentId}")
    public ResponseEntity<?> getGroupsByStudentId(@PathVariable(name = "studentId") Integer studentId) {
        GroupAndStudent group = null;
        System.out.println("studentId" + studentId);
        if (studentId != null) {
            group = groupAndStudentService.getGroupAndStudentsByStudentId(studentId);
        }
        return new ResponseEntity<>(group, HttpStatus.OK);
    }
}

