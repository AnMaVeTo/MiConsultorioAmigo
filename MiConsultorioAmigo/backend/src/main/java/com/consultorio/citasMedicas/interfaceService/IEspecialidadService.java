package com.consultorio.citasMedicas.interfaceService;

import com.consultorio.citasMedicas.model.Especialidad;

import java.util.List;
import java.util.Optional;

public interface IEspecialidadService {

    public List<Especialidad> listarEspecialidad();
    public Optional<Especialidad> listIdEspecialidad(int id);
    public int saveEspecialidad (Especialidad especialidad);

    boolean actualizarEspecialidad(int id, Especialidad especialidad);
    public void deleteEspecialidad(int id);
}
