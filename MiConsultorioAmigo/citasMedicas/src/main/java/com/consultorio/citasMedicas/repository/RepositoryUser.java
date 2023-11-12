package com.consultorio.citasMedicas.repository;

import com.consultorio.citasMedicas.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RepositoryUser extends JpaRepository<User, Integer> {

    List<User> findByName(String name);
}
