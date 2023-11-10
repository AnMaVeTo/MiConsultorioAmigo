package com.consultorio.citasMedicas.services;

import com.consultorio.citasMedicas.interfaceService.IPacienteService;
import com.consultorio.citasMedicas.model.Paciente;
import com.consultorio.citasMedicas.repository.RepositoryPaciente;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServicePaciente implements IPacienteService {

    @Autowired
    private RepositoryPaciente repositoryPaciente;

    @Override
    public List<Paciente> listarPaciente(){return (List<Paciente>) repositoryPaciente.findAll();}

    @Override
    public Optional<Paciente> listIdPaciente(int id){ return repositoryPaciente.findById(id);}

    @Override
    public int savePaciente(Paciente e){
        int res =0;
        Paciente citas = repositoryPaciente.save(e);
        if(!citas.equals(null)){
            res = 1;
        }
        return res;
    }

    @Override
    public void deletePaciente(int id){repositoryPaciente.deleteById(id);}

    @Override
    public boolean actualizarPaciente(int id, Paciente cita) {
        Optional<Paciente> existingPaciente = repositoryPaciente.findById(id);
        if (existingPaciente.isPresent()) {
            Paciente updatedPaciente = existingPaciente.get();

            updatedPaciente.setApellido(cita.getApellido());
            updatedPaciente.setCelular(cita.getCelular());
            updatedPaciente.setDireccion(cita.getDireccion());
            updatedPaciente.setEmail(cita.getEmail());
            updatedPaciente.setGenero(cita.getGenero());
            updatedPaciente.setNombre(cita.getNombre());
            updatedPaciente.setFechaNacimiento(cita.getFechaNacimiento());
            updatedPaciente.setHistoriaClinica(cita.getHistoriaClinica());
            updatedPaciente.setMedicamentos(cita.getMedicamentos());

            repositoryPaciente.save(updatedPaciente);
            return true;
        } else {
            return false;
        }
    }
}
