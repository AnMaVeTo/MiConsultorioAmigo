package com.consultorio.citasMedicas.interfaceService;

import com.consultorio.citasMedicas.model.User;

import java.util.List;

public interface IUserServices {
    public List<User> listarUser();
    public User listIdUser(int id);
    public int saveUser(User user);
    public void deleteUser(int id);

    List<User> findByName(String name);
}
