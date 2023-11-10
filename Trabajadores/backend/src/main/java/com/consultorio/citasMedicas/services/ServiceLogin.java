package com.consultorio.citasMedicas.services;

import com.consultorio.citasMedicas.interfaceService.ILoginService;
import com.consultorio.citasMedicas.model.Rol;
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
        // Buscar al usuario por nombre de usuario
        Usuario usuario = repositoryUsuario.findByUsername(username);

        if (usuario != null) {
            // Verificar si la contraseña proporcionada coincide con la contraseña almacenada
            if (usuario.getPassword().equals(password)) {
                System.out.println("valido");
                return usuario;
            }
        }

        return usuario; // Credenciales incorrectas
    }

}
