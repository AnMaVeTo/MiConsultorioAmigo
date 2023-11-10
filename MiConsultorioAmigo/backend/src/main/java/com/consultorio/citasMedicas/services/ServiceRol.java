package com.consultorio.citasMedicas.services;

import com.consultorio.citasMedicas.interfaceService.IRolService;
import com.consultorio.citasMedicas.model.Rol;
import com.consultorio.citasMedicas.repository.RepositoryRol;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServiceRol implements IRolService {


    @Autowired
    private RepositoryRol repositoryRol;

    @Override
    public List<Rol> listarRol(){return (List<Rol>) repositoryRol.findAll();}

    @Override
    public Optional<Rol> listIdRol(int id) {
        return repositoryRol.findById(id);
    }


    @Override
    public int saveRol(Rol r){
        int res =0;
        Rol rol = repositoryRol.save(r);
        if(!rol.equals(null)){
            res = 1;
        }
        return res;
    }

    @Override
    public boolean actualizarRol(int id, Rol rol) {
        Optional<Rol> existingRol = repositoryRol.findById(id);
        if (existingRol.isPresent()) {
            Rol updatedRol = existingRol.get();

            updatedRol.setNombre(rol.getNombre());

            repositoryRol.save(updatedRol);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public void deleteRol(int id){repositoryRol.deleteById(id);}
}
