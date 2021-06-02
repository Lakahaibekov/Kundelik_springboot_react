package com.project.kundelik.services;

import com.project.kundelik.entities.Users;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserService extends UserDetailsService {

    Users saveUser(Users user);
    Users addUser(Users user);
    Users getUser(Long id);
    void deleteUser(Users user);
    List<Users> getAllUsers();
    List<Users> getAllTeachers();
    List<Users> getAllStudents();

    Users getUserByEmail(String email);
}
