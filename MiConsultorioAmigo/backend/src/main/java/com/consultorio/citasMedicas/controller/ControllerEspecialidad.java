package com.consultorio.citasMedicas.controller;

import com.consultorio.citasMedicas.interfaceService.IEspecialidadService;
import com.consultorio.citasMedicas.model.Especialidad;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/especialidad")
public class ControllerEspecialidad {


    @Autowired
    private IEspecialidadService iEspecialidadService;

    @GetMapping("/listar")
    public List<Especialidad> listarEspecialidad() {
        List<Especialidad> especialidades = iEspecialidadService.listarEspecialidad();
        return especialidades;
    }

    @GetMapping("/listar/{id}")
    public Optional<Especialidad> listarEspecialidadId(@PathVariable int id) {
        Optional<Especialidad> especialidadId = iEspecialidadService.listIdEspecialidad(id);
        return especialidadId;
    }

    @PostMapping("/crear")
    public int crearEspecialidad(@RequestBody Especialidad especialidad) {
        int newEspecialidad = iEspecialidadService.saveEspecialidad(especialidad);
        return newEspecialidad;
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<String> eliminarEspecialidad(@PathVariable int id) {
        iEspecialidadService.deleteEspecialidad(id);
        return ResponseEntity.ok("Especialidad eliminada exitosamente");
    }

    @PutMapping("/actualizar/{id}")
    public ResponseEntity<String> actualizarEspecialidad(@PathVariable int id, @RequestBody Especialidad especialidad) {
        Boolean existingEspecialidad = iEspecialidadService.actualizarEspecialidad(id, especialidad);

        if (existingEspecialidad) {
            return ResponseEntity.ok("Especialidad actualizada exitosamente");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
