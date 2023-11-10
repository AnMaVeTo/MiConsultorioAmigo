package com.consultorio.citasMedicas.interfaceService;

import com.consultorio.citasMedicas.model.Rol;

import java.util.List;
import java.util.Optional;

public interface IRolService {
    public List<Rol> listarRol();
    public Optional<Rol> listIdRol(int id);
    public int saveRol (Rol rol);

    boolean actualizarRol(int id, Rol rol);
    public void deleteRol(int id);
}
