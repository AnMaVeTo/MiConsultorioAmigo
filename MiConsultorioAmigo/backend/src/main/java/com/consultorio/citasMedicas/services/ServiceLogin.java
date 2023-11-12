package com.consultorio.citasMedicas.services;

import com.consultorio.citasMedicas.interfaceService.ILoginService;
import com.consultorio.citasMedicas.model.Usuario;
import com.consultorio.citasMedicas.repository.RepositoryUsuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ServiceLogin implements ILoginService {

    @Autowired
    public RepositoryUsuario repositoryUsuario;

    @Override
    public Usuario loginUser(String username, String password) {
        Usuario usuario = repositoryUsuario.findByUsername(username);

        if (usuario != null && usuario.getPassword().equals(password)) {
            // Las credenciales son correctas
            System.out.println("Usuario válido");
            return usuario;
        } else {
            // Las credenciales son incorrectas
            System.out.println("Credenciales incorrectas");
            return null;
        }
    }


}
