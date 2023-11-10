package com.consultorio.citasMedicas.services;

import com.consultorio.citasMedicas.interfaceService.IEspecialidadService;
import com.consultorio.citasMedicas.model.Especialidad;
import com.consultorio.citasMedicas.repository.RepositoryEspecialidad;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServiceEspecialidad implements IEspecialidadService {


    @Autowired
    private RepositoryEspecialidad repositoryEspecialidad;

    @Override
    public List<Especialidad> listarEspecialidad(){return (List<Especialidad>) repositoryEspecialidad.findAll();}

    @Override
    public Optional<Especialidad> listIdEspecialidad(int id){ return repositoryEspecialidad.findById(id);}

    @Override
    public int saveEspecialidad(Especialidad p){
        int res =0;
        Especialidad prioridad = repositoryEspecialidad.save(p);
        if(!prioridad.equals(null)){
            res = 1;
        }
        return res;
    }

    @Override
    public boolean actualizarEspecialidad(int id, Especialidad especialidad) {
        Optional<Especialidad> existingEspecialidad = repositoryEspecialidad.findById(id);
        if (existingEspecialidad.isPresent()) {
            Especialidad updatedEspecialidad = existingEspecialidad.get();

            updatedEspecialidad.setNombre(especialidad.getNombre());

            repositoryEspecialidad.save(updatedEspecialidad);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public void deleteEspecialidad(int id){repositoryEspecialidad.deleteById(id);}
}
