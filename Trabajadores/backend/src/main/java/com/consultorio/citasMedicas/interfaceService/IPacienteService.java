package com.consultorio.citasMedicas.interfaceService;

import com.consultorio.citasMedicas.model.Paciente;

import java.util.List;
import java.util.Optional;

public interface IPacienteService {

    public List<Paciente> listarPaciente();
    public Optional<Paciente> listIdPaciente(int id);
    public int savePaciente(Paciente paciente);
    public void deletePaciente(int id);

    boolean actualizarPaciente(int id, Paciente paciente);
}
