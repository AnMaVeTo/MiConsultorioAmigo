package com.consultorio.citasMedicas.services;

import com.consultorio.citasMedicas.interfaceService.IUsuarioService;
import com.consultorio.citasMedicas.model.Usuario;
import com.consultorio.citasMedicas.repository.RepositoryUsuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServiceUsuario implements IUsuarioService {

    @Autowired
    private RepositoryUsuario repositoryUsuario;

    @Override
    public List<Usuario> listarUsuario(){return (List<Usuario>) repositoryUsuario.findAll();}

    @Override
    public Optional<Usuario> listIdUsuario(int id){ return repositoryUsuario.findById(id);}

    @Override
    public int saveUsuario(Usuario usuario) {
        int res = 0;
        Usuario usuarioSaved = repositoryUsuario.save(usuario);
        if (usuarioSaved != null) {
            res = 1;
        }
        return res;
    }

    @Override
    public boolean actualizarUsuario(int id, Usuario usuario) {
        Optional<Usuario> existingUsuario = repositoryUsuario.findById(id);
        if (existingUsuario.isPresent()) {
            Usuario updatedUsuario = existingUsuario.get();

            updatedUsuario.setRol(usuario.getRol());
            updatedUsuario.setUsername(usuario.getUsername());
            updatedUsuario.setPassword(usuario.getPassword());

            repositoryUsuario.save(updatedUsuario);
            return true;
        } else {
            return false;
        }
    }


    @Override
    public void deleteUsuario(int id){repositoryUsuario.deleteById(id);}

    @Override
    public Usuario findUsuarioByUsername(String username) {
        return repositoryUsuario.findByUsername(username);
    }

}
