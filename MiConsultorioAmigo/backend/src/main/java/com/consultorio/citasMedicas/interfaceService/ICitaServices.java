package com.consultorio.citasMedicas.interfaceService;

import com.consultorio.citasMedicas.model.Cita;

import java.util.List;
import java.util.Optional;

public interface ICitaServices {

    public List<Cita> listarCita();
    public Optional<Cita> listIdCita(int id);
    public int saveCita(Cita estados);
    public void deleteCita(int id);

    boolean actualizarCita(int id, Cita cita);
}
