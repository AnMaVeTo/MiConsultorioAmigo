package com.consultorio.citasMedicas.interfaceService;

import com.consultorio.citasMedicas.model.Usuario;

import java.util.List;
import java.util.Optional;

public interface IUsuarioService {

    public List<Usuario> listarUsuario();

    public Optional<Usuario> listIdUsuario(int id);
    public int saveUsuario (Usuario Usuario);

    public boolean actualizarUsuario(int id, Usuario usuario);
    public void deleteUsuario(int id);

    Usuario findUsuarioByUsername(String username);
}
