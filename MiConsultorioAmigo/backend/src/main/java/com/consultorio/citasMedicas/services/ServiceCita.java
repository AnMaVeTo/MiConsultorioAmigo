package com.consultorio.citasMedicas.services;

import com.consultorio.citasMedicas.interfaceService.ICitaServices;
import com.consultorio.citasMedicas.model.Cita;
import com.consultorio.citasMedicas.repository.RepositoryCita;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServiceCita implements ICitaServices {
    @Autowired
    private RepositoryCita repositoryCita;

    @Override
    public List<Cita> listarCita(){return (List<Cita>) repositoryCita.findAll();}

    @Override
    public Optional<Cita> listIdCita(int id){ return repositoryCita.findById(id);}

    @Override
    public int saveCita(Cita e){
        int res =0;
        Cita citas = repositoryCita.save(e);
        if(!citas.equals(null)){
            res = 1;
        }
        return res;
    }

    @Override
    public void deleteCita(int id){repositoryCita.deleteById(id);}

    @Override
    public boolean actualizarCita(int id, Cita cita) {
        Optional<Cita> existingCita = repositoryCita.findById(id);
        if (existingCita.isPresent()) {
            Cita updatedCita = existingCita.get();

            updatedCita.setComentarios(cita.getComentarios());
            updatedCita.setIdPaciente(cita.getIdPaciente());
            updatedCita.setIdMedico(cita.getIdMedico());
            updatedCita.setFechaHora(cita.getFechaHora());
            updatedCita.setDuracion(cita.getDuracion());
            updatedCita.setMotivo(cita.getMotivo());
            updatedCita.setEstado(cita.getEstado());

            repositoryCita.save(updatedCita);
            return true;
        } else {
            return false;
        }
    }
}
