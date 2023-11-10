package com.consultorio.citasMedicas.services;

import com.consultorio.citasMedicas.interfaceService.IUserServices;
import com.consultorio.citasMedicas.model.User;
import com.consultorio.citasMedicas.repository.RepositoryUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService implements IUserServices {

    @Autowired
    private RepositoryUser repositoryUser;

    @Override
    public List<User> listarUser() {
        return (List<User>) repositoryUser.findAll();
    }

    @Override
    public User listIdUser(int id) {
        return repositoryUser.findById(id).orElse(null);
    }

    @Override
    public int saveUser(User user) {
        int res = 0;
        User savedUser = repositoryUser.save(user);
        if (savedUser != null) {
            res = 1;
        }
        return res;
    }

    @Override
    public void deleteUser(int id) {
        repositoryUser.deleteById(id);
    }

    public List<User> findByName(String name) {
        return repositoryUser.findByName(name);
    }
}
