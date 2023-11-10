package com.consultorio.citasMedicas.interfaceService;

import com.consultorio.citasMedicas.model.Cita;
import com.consultorio.citasMedicas.model.Medico;

import java.util.List;
import java.util.Optional;

public interface IMedicoService {

    public List<Medico> listarMedico();
    public Optional<Medico> listIdMedico(int id);
    public int saveMedico (Medico medico);

    boolean actualizarMedico(int id, Medico medico);
    public void deleteMedico(int id);
}
