package com.consultorio.citasMedicas.services;

import com.consultorio.citasMedicas.interfaceService.IMedicoService;
import com.consultorio.citasMedicas.model.Medico;
import com.consultorio.citasMedicas.repository.RepositoryMedico;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServiceMedico implements IMedicoService {

    @Autowired
    private RepositoryMedico repositoryMedico;

    @Override
    public List<Medico> listarMedico(){return (List<Medico>) repositoryMedico.findAll();}

    @Override
    public Optional<Medico> listIdMedico(int id){ return repositoryMedico.findById(id);}

    @Override
    public int saveMedico(Medico p){
        int res =0;
        Medico prioridad = repositoryMedico.save(p);
        if(!prioridad.equals(null)){
            res = 1;
        }
        return res;
    }

    @Override
    public boolean actualizarMedico(int id, Medico medico) {
        Optional<Medico> existingMedico = repositoryMedico.findById(id);
        if (existingMedico.isPresent()) {
            Medico updatedMedico = existingMedico.get();

            updatedMedico.setNombre(medico.getNombre());
            updatedMedico.setEspecialidad(medico.getEspecialidad());
            updatedMedico.setEmail(medico.getEmail());
            updatedMedico.setConsultorio(medico.getConsultorio());
            updatedMedico.setCelular(medico.getCelular());

            repositoryMedico.save(updatedMedico);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public void deleteMedico(int id){repositoryMedico.deleteById(id);}
}
