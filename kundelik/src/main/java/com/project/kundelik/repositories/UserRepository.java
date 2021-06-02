package com.project.kundelik.repositories;

import com.project.kundelik.entities.Roles;
import com.project.kundelik.entities.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface UserRepository extends JpaRepository<Users, Long> {

    Users findByEmail(String email);
    List<Users> getAllByRoles(Roles role);

}
