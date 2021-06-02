package com.project.kundelik.services.impl;


import com.project.kundelik.entities.Roles;
import com.project.kundelik.entities.Users;
import com.project.kundelik.repositories.RolesRepository;
import com.project.kundelik.repositories.UserRepository;
import com.project.kundelik.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RolesRepository rolesRepository;

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        Users user = userRepository.findByEmail(s);
        if(user!=null){
            return user;
        }else{
            throw new UsernameNotFoundException("USER NOT FOUND");
        }
    }

    @Override
    public Users getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public Users addUser(Users user) {
        return userRepository.save(user);
    }


    @Override
    public Users saveUser(Users user) {
        return userRepository.save(user);
    }

    @Override
    public Users getUser(Long id) {
        return userRepository.getOne(id);
    }

    @Override
    public void deleteUser(Users user) {
        userRepository.delete(user);
    }

    @Override
    public List<Users> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public List<Users> getAllTeachers() {
        Roles role = rolesRepository.findById((long) 2).get();
        return userRepository.getAllByRoles(role);
    }

    @Override
    public List<Users> getAllStudents() {
        Roles role = rolesRepository.findById((long) 3).get();
        return userRepository.getAllByRoles(role);
    }


}
